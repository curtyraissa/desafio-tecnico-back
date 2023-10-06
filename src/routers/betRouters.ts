import { Router } from 'express';
import betController from '../controllers/betController'; 
import { validateBody } from '../middlewares/validationMiddleware';
import { createBetSchema } from '../schema/betSchema'; 

const betRouter = Router();

// Rota para criar uma aposta
betRouter.post('', validateBody(createBetSchema), betController.createBet);

// Rota para buscar todas as apostas
betRouter.get('', betController.getAllBets);

// Rota para buscar uma aposta específica por ID
betRouter.get('/:id', betController.getBetById);

export { betRouter };
