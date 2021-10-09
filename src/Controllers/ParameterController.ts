import {
  Handler, Request, Response, Router,
} from 'express';
import ParameterType from '../Enum/ParameterType';
import logger from '../Logger/logger';
import ParameterService from '../Services/ParameterService';

const router = Router();

const getParameters: Handler = async (req: Request, res: Response) => {
  try {
    const parameters = await ParameterService.getParameters();
    return res.status(200).send(parameters);
  } catch (error) {
    const e = error as Error;
    logger.info(e.message);
    return res.status(400).json({ error: e.message });
  }
};

const getDefaultWeights: Handler = async (req: Request, res: Response) => {
  try {
    const weights = await ParameterService.getDefaultWeights();
    return res.status(200).send(weights);
  } catch (error) {
    const e = error as Error;
    logger.info(e.message);
    return res.status(400).json({ error: e.message });
  }
};

const getDefaultExtraData: Handler = async (req: Request, res: Response) => {
  try {
    const weights = await ParameterService.getDefaultExtraData();
    return res.status(200).send(weights);
  } catch (error) {
    const e = error as Error;
    logger.info(e.message);
    return res.status(400).json({ error: e.message });
  }
};

const updateParameterValue: Handler = async (req: Request, res: Response) => {
  const { parameter } = req.body;
  try {
    switch (parameter.parameterType) {
      case ParameterType.DefaultWeight:
        await ParameterService.updateDefaultWeight(
          parameter.ageRange, parameter.sex, parameter.value,
        );
        break;
      case ParameterType.MinorPAL:
      case ParameterType.AdultPAL:
      case ParameterType.Maternity:
        await ParameterService.updateExtraData(parameter.id, parameter.value);
        break;
      case ParameterType.TEE:
      case ParameterType.BMR:
        await ParameterService.updateEquationConstant(
          parameter.ageRange, parameter.sex, parameter.order, parameter.value,
        );
        break;
      default:
        break;
    }
    return res.status(200).send();
  } catch (error) {
    const e = error as Error;
    logger.info(e.message);
    return res.status(400).json({ error: e.message });
  }
};

router.post('/', getParameters);
router.post('/weights/', getDefaultWeights);
router.post('/extraData/', getDefaultExtraData);
router.put('/parameterUpdate/', updateParameterValue);

export default router;
