import {
  Handler, Request, Response, Router,
} from 'express';
import AgeGroupJSON from '../DTOs/AgeGroupJSON';
import CalculatorService from '../Services/CalculatorService';
import CalculatorResponse from '../DTOs/CalculatorResponseDTO';

const router = Router();

const getREP: Handler = async (req: Request, res: Response) => {
  const groups: AgeGroupJSON[] = req.body;
  try {
    const EnergyReq: CalculatorResponse = CalculatorService.calculateEnergeticRequirement(groups);
    return res.status(200).send(EnergyReq);
  } catch (error) {
    const e = error as Error;
    return res.status(400).json({ error: e.message });
  }
};

router.post('/', getREP);

export default router;
