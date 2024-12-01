import { Request, Response } from 'express';
import { createEvent, getEvents, getEventById, updateEvent, deleteEvent } from '../services/eventService';
import { validate } from '../middlewares/validationMiddleware';
import { eventSchema, updateEventSchema } from '../validators/eventValidator';
import mongoose from 'mongoose';

const validateObjectId = (req: Request, res: Response, next: () => void) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: 'Invalid ID format' });
  }
  next();
};

export const createEventHandler = [
  validate(eventSchema),
  async (req: Request, res: Response) => {
    try {
      const event = await createEvent(req.body);
      res.status(201).json(event);
    } catch (error) {
      console.error('Error creating event:', (error as Error).message);
      res.status(500).json({ msg: 'Server error', error: (error as Error).message });
    }
  },
];

export const getEventsHandler = async (req: Request, res: Response) => {
  try {
    const events = await getEvents();
    res.json(events);
  } catch (error) {
    console.error('Error retrieving events:', (error as Error).message);
    res.status(500).json({ msg: 'Server error', error: (error as Error).message });
  }
};

export const getEventByIdHandler = [
  validateObjectId,
  async (req: Request, res: Response) => {
    try {
      const eventId = req.params.id;
      const event = await getEventById(eventId);
      if (!event) {
        return res.status(404).json({ msg: 'Event not found' });
      }
      res.json(event);
    } catch (error) {
      console.error('Error retrieving event by ID:', (error as Error).message);
      res.status(500).json({ msg: 'Server error', error: (error as Error).message });
    }
  },
];

export const updateEventHandler = [
  validate(updateEventSchema),
  async (req: Request, res: Response) => {
    try {
      const eventId = req.params.id;
      const event = await updateEvent(eventId, req.body);
      if (!event) {
        return res.status(404).json({ msg: 'Event not found' });
      }
      res.json(event);
    } catch (error) {
      console.error('Error updating event:', (error as Error).message);
      res.status(500).json({ msg: 'Failed to update event', error: (error as Error).message });
    }
  },
];

export const deleteEventHandler = [
  validateObjectId,
  async (req: Request, res: Response) => {
    try {
      const eventId = req.params.id;
      const event = await deleteEvent(eventId);
      if (!event) {
        return res.status(404).json({ msg: 'Event not found' });
      }
      res.json({ msg: 'Event removed' });
    } catch (error) {
      console.error('Error deleting event:', (error as Error).message);
      res.status(500).json({ msg: 'Server error', error: (error as Error).message });
    }
  },
];
