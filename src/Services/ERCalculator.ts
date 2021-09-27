import AgeGroup from '../DTOs/AgeGroupDTO';
import EnergeticRequirement from '../DTOs/EnergeticRequirementDTO';
import CalculatorResponse from '../DTOs/CalculatorResponseDTO';
import GroupEnergeticRequirement from '../DTOs/GroupEnergeticRequirementDTO';
import ExtraData from '../DTOs/ExtraDataDTO';
import MinorPAL from '../DTOs/MinorPALDTO';
import AdultPAL from '../DTOs/AdultPALDTO';
import IndividualMaternity from '../DTOs/IndividualMaternityDTO';
import PopulationMaternity from '../DTOs/PopulationMaternityDTO';
import Sex from '../Enum/Sex';
import AgeBracket from '../Enum/AgeBracket';
import ParserService from './ParserService';

// eslint-disable-next-line max-len
const isIndividualMaternity = (obj: IndividualMaternity | PopulationMaternity): obj is IndividualMaternity => {
  if ((obj as IndividualMaternity).pregnantWomen !== undefined) {
    return true;
  }
  return false;
};

// TEE (Total Energetic Expenditure) = GET (Gasto Energetico Total)
const calculateTEE = (group: AgeGroup, params: number[], preval: MinorPAL): number => {
  const teeModerate: number = params[0]
  + (params[1] * group.medianWeight)
  + params[2] * (group.medianWeight * group.medianWeight);

  const teeLow: number = teeModerate + (teeModerate * params[4]) / 100;
  const teeIntense: number = teeModerate + (teeModerate * params[5]) / 100;

  const ret: number = (teeLow * preval.lowPALPrevalence) / 100
  + (teeModerate * preval.moderatePALPrevalence) / 100
  + (teeIntense * preval.intensePALPrevalence) / 100;

  return ret;
};

// BMR (Basal Metabolic Rate) = TMB (Tasa Metabolica Basal)
const calculateBMR = (group: AgeGroup, params: number[]): number => {
  const ret: number = params[0] * group.medianWeight + params[1];
  return ret;
};

// PAL (Physical Activity Level) = NAF (Nivel de Actividad Fisica)
const calculatePAL = (params: number[], popData: AdultPAL): number => {
  const ruralPAL: number = (popData.activeRuralPAL * params[2]) / 100
  + (popData.lowRuralPAL * params[3]) / 100;
  const urbanPAL: number = (popData.activeUrbanPAL * params[4]) / 100
  + (popData.lowUrbanPAL * params[5]) / 100;

  const ret = (ruralPAL * popData.ruralPercentage) / 100
  + (urbanPAL * popData.urbanPercentage) / 100;
  return ret;
};

// eslint-disable-next-line max-len
const calculateERWomenIndividual = (group: AgeGroup, params: number[], popData: IndividualMaternity, req: number): number => {
  const percentPregnantWomen = (popData.pregnantWomen * 100) / group.population;
  const percentLactatingWomen = (popData.lactatingWomen * 100) / group.population;

  const reqPregnantWomen = (percentPregnantWomen * (req + params[6])) / 100;
  const reqLactatingWomen = (percentLactatingWomen * (req + params[7])) / 100;
  const reqRestOfWomen = ((100 - percentPregnantWomen - percentLactatingWomen) * req) / 100;

  return reqPregnantWomen + reqLactatingWomen + reqRestOfWomen;
};

// eslint-disable-next-line max-len
const calculateERWomenPopulation = (params: number[], popData: PopulationMaternity, req: number): number => {
  const annualBirths = (popData.countryBirthRate * popData.countryPopulation) / 1000;

  const percentPregnantWomen = (annualBirths * 75) / popData.countryWomenInAgeGroup;
  const percentLactatingWomen = (annualBirths * 50) / popData.countryWomenInAgeGroup;

  const reqPregnantWomen = (percentPregnantWomen * (req + params[6])) / 100;
  const reqLactatingWomen = (percentLactatingWomen * (req + params[7])) / 100;
  const reqRestOfWomen = ((100 - percentPregnantWomen - percentLactatingWomen) * req) / 100;

  return reqPregnantWomen + reqLactatingWomen + reqRestOfWomen;
};

const calculateLessThanAYear = (group: AgeGroup, params: number[]): GroupEnergeticRequirement => {
  const requirement = params[0] + (params[1] * group.medianWeight) + params[2];

  const groupRequirement: GroupEnergeticRequirement = {
    group: ParserService.unparseGroup(group),
    perCapita: requirement,
    total: requirement * group.population,
  };

  return groupRequirement;
};

const calculate1To5Years = (group: AgeGroup, params: number[]): GroupEnergeticRequirement => {
  const requirement = params[0]
  + (params[1] * group.medianWeight)
  + (params[2] * (group.medianWeight ** 2))
  + params[3];

  const groupRequirement: GroupEnergeticRequirement = {
    group: ParserService.unparseGroup(group),
    perCapita: requirement,
    total: requirement * group.population,
  };

  return groupRequirement;
};

// eslint-disable-next-line max-len
const calculate6To17Years = (group: AgeGroup, params: number[], data: ExtraData): GroupEnergeticRequirement => {
  let tee: number;
  if (typeof (data.minorPAL) === 'undefined') {
    throw new Error('Missing data');
  } else {
    tee = calculateTEE(group, params, data.minorPAL);
  }

  const requirement = tee + params[3];

  const groupRequirement: GroupEnergeticRequirement = {
    group: ParserService.unparseGroup(group),
    perCapita: requirement,
    total: requirement * group.population,
  };

  return groupRequirement;
};

// eslint-disable-next-line max-len
const calculate18To29Years = (group: AgeGroup, params: number[], data: ExtraData): GroupEnergeticRequirement => {
  let bmr: number;
  let pal: number;
  if (typeof (data.adultPAL) === 'undefined') {
    throw new Error('Missing data');
  } else {
    bmr = calculateBMR(group, params);
    pal = calculatePAL(params, data.adultPAL);
  }

  let requirement: number = bmr * pal;

  // If the group's sex is Female, then you have to take into account
  // the extra energy required by women that are pregnant or lactating
  if (group.sex === Sex.Female) {
    if (data.maternity18To29 === undefined) {
      throw new Error('Missing data');
    } else if (isIndividualMaternity(data.maternity18To29)) {
      requirement = calculateERWomenIndividual(group, params, data.maternity18To29, requirement);
    } else {
      requirement = calculateERWomenPopulation(params, data.maternity18To29, requirement);
    }
  }

  const groupRequirement: GroupEnergeticRequirement = {
    group: ParserService.unparseGroup(group),
    perCapita: requirement,
    total: requirement * group.population,
  };

  return groupRequirement;
};

// eslint-disable-next-line max-len
const calculate30To59Years = (group: AgeGroup, params: number[], data: ExtraData): GroupEnergeticRequirement => {
  let bmr: number;
  let pal: number;
  if (typeof (data.adultPAL) === 'undefined') {
    throw new Error('Missing data');
  } else {
    bmr = calculateBMR(group, params);
    pal = calculatePAL(params, data.adultPAL);
  }

  let requirement: number = bmr * pal;

  // If the group's sex is Female, then you have to take into account
  // the extra energy required by women that are pregnant or lactating
  if (group.sex === Sex.Female) {
    if (typeof (data.maternity30To59) === 'undefined') {
      throw new Error('Missing data');
    } else if (isIndividualMaternity(data.maternity30To59)) {
      requirement = calculateERWomenIndividual(group, params, data.maternity30To59, requirement);
    } else {
      requirement = calculateERWomenPopulation(params, data.maternity30To59, requirement);
    }
  }

  const groupRequirement: GroupEnergeticRequirement = {
    group: ParserService.unparseGroup(group),
    perCapita: requirement,
    total: requirement * group.population,
  };

  return groupRequirement;
};

// eslint-disable-next-line max-len
const calculate60PlusYears = (group: AgeGroup, params: number[], data: ExtraData): GroupEnergeticRequirement => {
  let bmr: number;
  let pal: number;
  if (typeof (data.adultPAL) === 'undefined') {
    throw new Error('Missing data');
  } else {
    bmr = calculateBMR(group, params);
    pal = calculatePAL(params, data.adultPAL);
  }

  const requirement: number = bmr * pal;

  const groupRequirement: GroupEnergeticRequirement = {
    group: ParserService.unparseGroup(group),
    perCapita: requirement,
    total: requirement * group.population,
  };

  return groupRequirement;
};

// eslint-disable-next-line max-len
const calculateER = (groupParameters: Map<number[], AgeGroup>, data: ExtraData): CalculatorResponse => {
  let totalOfPeople = 0;
  let totalRequirement = 0;

  const requirements: GroupEnergeticRequirement[] = [];

  groupParameters.forEach((group: AgeGroup, params: number[]) => {
    totalOfPeople += group.population;
    let groupRequirement: GroupEnergeticRequirement;
    switch (group.age) {
      case AgeBracket.m0:
      case AgeBracket.m1:
      case AgeBracket.m2:
      case AgeBracket.m3:
      case AgeBracket.m4:
      case AgeBracket.m5:
      case AgeBracket.m6:
      case AgeBracket.m7:
      case AgeBracket.m8:
      case AgeBracket.m9:
      case AgeBracket.m10:
      case AgeBracket.m11: {
        groupRequirement = calculateLessThanAYear(group, params);
        break;
      }
      case AgeBracket.a1:
      case AgeBracket.a2:
      case AgeBracket.a3:
      case AgeBracket.a4:
      case AgeBracket.a5: {
        groupRequirement = calculate1To5Years(group, params);
        break;
      }
      case AgeBracket.a6:
      case AgeBracket.a7:
      case AgeBracket.a8:
      case AgeBracket.a9:
      case AgeBracket.a10:
      case AgeBracket.a11:
      case AgeBracket.a12:
      case AgeBracket.a13:
      case AgeBracket.a14:
      case AgeBracket.a15:
      case AgeBracket.a16:
      case AgeBracket.a17: {
        groupRequirement = calculate6To17Years(group, params, data);
        break;
      }
      case AgeBracket.a18_29: {
        groupRequirement = calculate18To29Years(group, params, data);
        break;
      }
      case AgeBracket.a30_59: {
        groupRequirement = calculate30To59Years(group, params, data);
        break;
      }
      case AgeBracket.a60: {
        groupRequirement = calculate60PlusYears(group, params, data);
        break;
      }
      default: {
        throw new Error('Parsing error, attribute edad does not respect format');
      }
    }
    totalRequirement += groupRequirement.total;
    requirements.push(groupRequirement);
  });

  const totalER: EnergeticRequirement = {
    perCapita: totalRequirement / totalOfPeople,
    total: totalRequirement,
    totalPopulation: totalOfPeople,
  };

  const result: CalculatorResponse = {
    groupsRequirements: requirements,
    totalRequirement: totalER,
  };

  return result;
};

export default { calculateER };