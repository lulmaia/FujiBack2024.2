import { Event, IEvent } from '../models/eventModel';

export interface IEventData {
  name: string;
  date: string;
  location: string;
  description: string;
}

export const createEvent = async (data: IEventData): Promise<IEvent> => {
  try {
    const newEvent = new Event(data);
    return await newEvent.save();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Error creating event: ' + error.message);
    } else {
      throw new Error('Unknown error occurred while creating event');
    }
  }
};

export const getEvents = async (): Promise<IEvent[]> => {
  try {
    return await Event.find();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Error retrieving events: ' + error.message);
    } else {
      throw new Error('Unknown error occurred while retrieving events');
    }
  }
};

export const getEventById = async (id: string): Promise<IEvent | null> => {
  try {
    return await Event.findById(id);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Error retrieving event by ID: ' + error.message);
    } else {
      throw new Error('Unknown error occurred while retrieving event by ID');
    }
  }
};

export const updateEvent = async (id: string, data: Partial<IEventData>): Promise<IEvent | null> => {
  try {
    return await Event.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Error updating event: ' + error.message);
    } else {
      throw new Error('Unknown error occurred while updating event');
    }
  }
};

export const deleteEvent = async (id: string): Promise<IEvent | null> => {
  try {
    return await Event.findByIdAndDelete(id);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Error deleting event: ' + error.message);
    } else {
      throw new Error('Unknown error occurred while deleting event');
    }
  }
};
