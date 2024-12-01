import { Event } from '../api/models/eventModel';

describe('Event Model', () => {
  it('should validate an event model', () => {
    const event = new Event({ name: 'Test Event', date: '2024-08-06' });
    expect(event.name).toBe('Test Event');
    expect(event.date).toBe('2024-08-06');
  });

  it('should validate that the name field is required', () => {
    const event = new Event({ date: '2024-08-06' });
    const error = event.validateSync();
    expect(error).not.toBeNull();
    if (error) {
      expect(error.errors.name).toBeDefined();
    }
  });

   it('should create an event with valid data', () => {
    const event = new Event({ name: 'Valid Event', date: '2024-08-06' });
    expect(event.name).toBe('Valid Event');
    expect(event.date).toBe('2024-08-06');
  });

  it('should create an event with optional fields', () => {
    const event = new Event({ name: 'Event with Optional Fields', date: '2024-08-06', description: 'This is an optional description' });
    expect(event.description).toBe('This is an optional description');
  });

  it('should compare two events correctly', () => {
    const event1 = new Event({ name: 'Event 1', date: '2024-08-06' });
    const event2 = new Event({ name: 'Event 1', date: '2024-08-06' });
    expect(event1.name).toBe(event2.name);
    expect(event1.date).toBe(event2.date);
  });
});
