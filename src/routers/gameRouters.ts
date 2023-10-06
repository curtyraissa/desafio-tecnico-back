import { Router } from 'express';
import { validateBody } from '../middlewares/validationMiddleware';
import { createGameSchema, finishGameSchema } from '../schema/gamesSchema'
import gameController from '../controllers/gamesController';

const gameRouter = Router();

gameRouter.post('/', validateBody(createGameSchema), gameController.createGame);
gameRouter.post('/:id/finish', validateBody(finishGameSchema), gameController.finishGame);

export { gameRouter };
