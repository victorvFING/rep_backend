import AgeBracket from '../Enum/AgeBracket';
import Sex from '../Enum/Sex';
// import Parameter from '../Models/Parameter';

const getEquationValues = (ageBracket: AgeBracket, sex: Sex): number[] => {
  let res: number[] = [];
  switch (ageBracket) {
    case (AgeBracket.m0): {
      if (sex === Sex.Masculino) {
        // -152 + (92.8*MP) + 211
        res = [-152, 92.8, 211];
      } else if (sex === Sex.Femenino) {
        // -152 + (92.8*MP) + 178
        res = [-152, 92.8, 178];
      }
      break;
    }
    case (AgeBracket.m1): {
      if (sex === Sex.Masculino) {
        // -152 + (92.8*MP) + 183
        res = [-152, 92.8, 183];
      } else if (sex === Sex.Femenino) {
        // -152 + (92.8*MP) + 161
        res = [-152, 92.8, 161];
      }
      break;
    }
    case (AgeBracket.m2): {
      if (sex === Sex.Masculino) {
        // -152 + (92.8*MP) + 139
        res = [-152, 92.8, 139];
      } else if (sex === Sex.Femenino) {
        // -152 + (92.8*MP) + 134
        res = [-152, 92.8, 134];
      }
      break;
    }
    case (AgeBracket.m3): {
      if (sex === Sex.Masculino) {
        // -152 + (92.8*MP) + 53
        res = [-152, 92.8, 53];
      } else if (sex === Sex.Femenino) {
        // -152 + (92.8*MP) + 68
        res = [-152, 92.8, 68];
      }
      break;
    }
    case (AgeBracket.m4): {
      if (sex === Sex.Masculino) {
        // -152 + (92.8*MP) + 46
        res = [-152, 92.8, 46];
      } else if (sex === Sex.Femenino) {
        // -152 + (92.8*MP) + 57
        res = [-152, 92.8, 57];
      }
      break;
    }
    case (AgeBracket.m5): {
      if (sex === Sex.Masculino) {
        // -152 + (92.8*MP) + 36
        res = [-152, 92.8, 36];
      } else if (sex === Sex.Femenino) {
        // -152 + (92.8*MP) + 47
        res = [-152, 92.8, 47];
      }
      break;
    }
    case (AgeBracket.m6): {
      if (sex === Sex.Masculino) {
        // -99.4 + (88.6*MP) + 17
        res = [-99.4, 88.6, 17];
      } else if (sex === Sex.Femenino) {
        // -99.4 + (88.6*MP) + 20
        res = [-99.4, 88.6, 20];
      }
      break;
    }
    case (AgeBracket.m7): {
      if (sex === Sex.Masculino) {
        // -99.4 + (88.6*MP) + 16
        res = [-99.4, 88.6, 16];
      } else if (sex === Sex.Femenino) {
        // -99.4 + (88.6*MP) + 17
        res = [-99.4, 88.6, 17];
      }
      break;
    }
    case (AgeBracket.m8): {
      if (sex === Sex.Masculino) {
        // -99.4 + (88.6*MP) + 14
        res = [-99.4, 88.6, 14];
      } else if (sex === Sex.Femenino) {
        // -99.4 + (88.6*MP) + 15
        res = [-99.4, 88.6, 15];
      }
      break;
    }
    case (AgeBracket.m9): {
      if (sex === Sex.Masculino) {
        // -99.4 + (88.6*MP) + 21
        res = [-99.4, 88.6, 21];
      } else if (sex === Sex.Femenino) {
        // -99.4 + (88.6*MP) + 18
        res = [-99.4, 88.6, 18];
      }
      break;
    }
    case (AgeBracket.m10): {
      if (sex === Sex.Masculino) {
        // -99.4 + (88.6*MP) + 21
        res = [-99.4, 88.6, 21];
      } else if (sex === Sex.Femenino) {
        // -99.4 + (88.6*MP) + 15
        res = [-99.4, 88.6, 15];
      }
      break;
    }
    case (AgeBracket.m11): {
      if (sex === Sex.Masculino) {
        // -99.4 + (88.6*MP) + 22
        res = [-99.4, 88.6, 22];
      } else if (sex === Sex.Femenino) {
        // -99.4 + (88.6*MP) + 14
        res = [-99.4, 88.6, 14];
      }
      break;
    }
    case (AgeBracket.a1): {
      if (sex === Sex.Masculino) {
        // 310.2 + (63.3*MP) - 0.263*MP^2 + 13
        res = [310.2, 63.3, -0.263, 13];
      } else if (sex === Sex.Femenino) {
        // 263.4 + (65.3*MP) - 0.454*MP^2 + 13
        res = [263.4, 65.3, -0.454, 13];
      }
      break;
    }
    case (AgeBracket.a2): {
      if (sex === Sex.Masculino) {
        // 310.2 + (63.3*MP) - 0.263*MP^2 + 12
        res = [310.2, 63.3, -0.263, 12];
      } else if (sex === Sex.Femenino) {
        // 263.4 + (65.3*MP) - 0.454*MP^2 + 13
        res = [263.4, 65.3, -0.454, 13];
      }
      break;
    }
    case (AgeBracket.a3): {
      if (sex === Sex.Masculino) {
        // 310.2 + (63.3*MP) - 0.263*MP^2 + 12
        res = [310.2, 63.3, -0.263, 12];
      } else if (sex === Sex.Femenino) {
        // 263.4 + (65.3*MP) - 0.454*MP^2 + 11
        res = [263.4, 65.3, -0.454, 11];
      }
      break;
    }
    case (AgeBracket.a4): {
      if (sex === Sex.Masculino) {
        // 310.2 + (63.3*MP) - 0.263*MP^2 + 11
        res = [310.2, 63.3, -0.263, 11];
      } else if (sex === Sex.Femenino) {
        // 263.4 + (65.3*MP) - 0.454*MP^2 + 10
        res = [263.4, 65.3, -0.454, 10];
      }
      break;
    }
    case (AgeBracket.a5): {
      if (sex === Sex.Masculino) {
        // 310.2 + (63.3*MP) - 0.263*MP^2 + 11
        res = [310.2, 63.3, -0.263, 11];
      } else if (sex === Sex.Femenino) {
        // 263.4 + (65.3*MP) - 0.454*MP^2 + 10
        res = [263.4, 65.3, -0.454, 10];
      }
      break;
    }
    default: {
      throw new Error('Parsing error, attribute edad does not respect format');
    }
  }
  return res;
};

export default { getEquationValues };
