import { createEvent, getEvents, getEventById, updateEvent, deleteEvent } from '../api/services/eventService';
import { Event } from '../api/models/eventModel';

jest.mock('../api/models/eventModel');

describe('Event Service Tests', () => {

  describe('createEvent', () => {
    it('should create a new event successfully', async () => {
      const eventData = { name: 'Test Event', date: '2024-08-06', location: 'Test Location', description: 'Test Description' };
      const newEvent = { _id: '12345', ...eventData };

      (Event.prototype.save as jest.Mock).mockResolvedValue(newEvent);

      const result = await createEvent(eventData);
      expect(result).toEqual(newEvent);
      expect(Event.prototype.save).toHaveBeenCalledTimes(1);
    });

    it('should handle errors when creating an event', async () => {
      const eventData = { name: 'Test Event', date: '2024-08-06', location: 'Test Location', description: 'Test Description' };

      (Event.prototype.save as jest.Mock).mockRejectedValue(new Error('Test error'));

      await expect(createEvent(eventData)).rejects.toThrow('Error creating event: Test error');
    });
  });

  describe('getEvents', () => {
    it('should return a list of events', async () => {
      const events = [
        { _id: '12345', name: 'Event 1', date: '2024-08-06', location: 'Location 1', description: 'Description 1' },
        { _id: '67890', name: 'Event 2', date: '2024-08-07', location: 'Location 2', description: 'Description 2' }
      ];

      (Event.find as jest.Mock).mockResolvedValue(events);

      const result = await getEvents();
      expect(result).toEqual(events);
      expect(Event.find).toHaveBeenCalledTimes(1);
    });

    it('should handle errors when retrieving events', async () => {
      (Event.find as jest.Mock).mockRejectedValue(new Error('Test error'));

      await expect(getEvents()).rejects.toThrow('Error retrieving events: Test error');
    });
  });

  describe('getEventById', () => {
    it('should return an event by ID', async () => {
      const event = { _id: '12345', name: 'Test Event', date: '2024-08-06', location: 'Test Location', description: 'Test Description' };

      (Event.findById as jest.Mock).mockResolvedValue(event);

      const result = await getEventById('12345');
      expect(result).toEqual(event);
      expect(Event.findById).toHaveBeenCalledWith('12345');
    });

    it('should handle errors when retrieving an event by ID', async () => {
      (Event.findById as jest.Mock).mockRejectedValue(new Error('Test error'));

      await expect(getEventById('12345')).rejects.toThrow('Error retrieving event by ID: Test error');
    });
  });

  describe('updateEvent', () => {
    it('should update an event by ID', async () => {
      const updatedEvent = { _id: '12345', name: 'Updated Event', date: '2024-08-06', location: 'Updated Location', description: 'Updated Description' };

      (Event.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedEvent);

      const result = await updateEvent('12345', { name: 'Updated Event' });
      expect(result).toEqual(updatedEvent);
      expect(Event.findByIdAndUpdate).toHaveBeenCalledWith('12345', { name: 'Updated Event' }, { new: true });
    });

    it('should handle errors when updating an event', async () => {
      (Event.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error('Test error'));

      await expect(updateEvent('12345', { name: 'Updated Event' })).rejects.toThrow('Error updating event: Test error');
    });
  });

  describe('deleteEvent', () => {
    it('should delete an event by ID', async () => {
      const deletedEvent = { _id: '12345', name: 'Test Event', date: '2024-08-06', location: 'Test Location', description: 'Test Description' };

      (Event.findByIdAndDelete as jest.Mock).mockResolvedValue(deletedEvent);

      const result = await deleteEvent('12345');
      expect(result).toEqual(deletedEvent);
      expect(Event.findByIdAndDelete).toHaveBeenCalledWith('12345');
    });

    it('should handle errors when deleting an event', async () => {
      (Event.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error('Test error'));

      await expect(deleteEvent('12345')).rejects.toThrow('Error deleting event: Test error');
    });
  });
});
