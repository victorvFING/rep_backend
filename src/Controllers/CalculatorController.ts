import {
  Handler, Request, Response, Router,
} from 'express';
import CalculatorService from '../Services/CalculatorService';
import CalculatorResponse from '../DTOs/CalculatorResponseDTO';
import logger from '../Logger/logger';

const router = Router();

const getREP: Handler = async (req: Request, res: Response) => {
  const { groups, extraData } = req.body;
  try {
    // sry pero no sabia como sacarle un caracter a esa linea :(
    // eslint-disable-next-line max-len
    const EnergyReq: CalculatorResponse = await CalculatorService.calculateEnergeticRequirement(groups, extraData);
    return res.status(200).send(EnergyReq);
  } catch (error) {
    const e = error as Error;
    logger.info(e.message);
    return res.status(400).json({ error: e.message });
  }
};

router.post('/', getREP);

export default router;
