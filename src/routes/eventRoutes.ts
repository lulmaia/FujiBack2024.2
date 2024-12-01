import { Router } from 'express';
import authMiddleware from '../api/middlewares/authMiddleware';
import { createEventHandler, getEventsHandler, getEventByIdHandler, updateEventHandler, deleteEventHandler } from '../api/controllers/eventController';

const router = Router();

router.use(authMiddleware);

router.post('/', createEventHandler);
router.get('/', getEventsHandler);
router.get('/:id', getEventByIdHandler);
router.put('/:id', updateEventHandler);
router.delete('/:id', deleteEventHandler);

export default router;
