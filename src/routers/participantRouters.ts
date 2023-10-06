import { Router } from 'express';
import participantController from '../controllers/participantController';
import { validateBody } from '../middlewares/validationMiddleware';
import { createParticipantSchema } from '../schema/participantSchema';

const participantRouter = Router();

participantRouter.post('/', validateBody(createParticipantSchema), participantController.createParticipant);

export { participantRouter };
