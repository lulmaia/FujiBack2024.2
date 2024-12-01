import request from 'supertest';
import express from 'express';
import { createEventHandler,getEventsHandler, getEventByIdHandler, updateEventHandler,deleteEventHandler} from '../api/controllers/eventController';
import connectDB from '../config/db';
import { Event } from '../api/models/eventModel';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

app.post('/api/events', createEventHandler);
app.get('/api/events', getEventsHandler);
app.get('/api/events/:id', getEventByIdHandler);
app.put('/api/events/:id', updateEventHandler);
app.delete('/api/events/:id', deleteEventHandler);

beforeAll(async () => {
  await connectDB();
});

beforeEach(async () => {
  await Event.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Event Controller', () => {
  describe('POST /api/events', () => {
    it('should create a new event with valid data', async () => {
      const response = await request(app)
        .post('/api/events')
        .send({
          name: 'Test Event',
          date: '2024-08-05T00:00:00.000Z',
          location: 'Test Location',
          description: 'Test Description'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('name', 'Test Event');
    });

    it('should return 400 for invalid data', async () => {
      const response = await request(app)
        .post('/api/events')
        .send({ name: '', date: '', location: '', description: '' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('msg');
    });
  });

  describe('GET /api/events', () => {
    it('should get all events', async () => {
      await request(app)
        .post('/api/events')
        .send({
          name: 'Test Event',
          date: '2024-08-05T00:00:00.000Z',
          location: 'Test Location',
          description: 'Test Description'
        });

      const response = await request(app).get('/api/events');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
    });

    it('should handle filtering events based on query parameters', async () => {
      await new Event({
        name: 'Filter Event',
        date: '2024-08-05T00:00:00.000Z',
        location: 'Filter Location',
        description: 'Filter Description'
      }).save();

      const response = await request(app).get('/api/events?location=Filter Location');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.arrayContaining([
        expect.objectContaining({ location: 'Filter Location' })
      ]));
    });
  });

  describe('GET /api/events/:id', () => {
    it('should get an event by ID', async () => {
      const createdEvent = await request(app)
        .post('/api/events')
        .send({
          name: 'Event By ID',
          date: '2024-08-05T00:00:00.000Z',
          location: 'Location By ID',
          description: 'Description By ID'
        });

      const response = await request(app).get(`/api/events/${createdEvent.body._id}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('name', 'Event By ID');
    });

    it('should return 404 for non-existent ID', async () => {
      const response = await request(app).get('/api/events/64a1d2041c4b0a4d1e4e1c0a');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('msg', 'Event not found');
    });
  });

  describe('PUT /api/events/:id', () => {
    it('should update an event with valid data', async () => {
      const createdEvent = await request(app)
        .post('/api/events')
        .send({
          name: 'Event To Update',
          date: '2024-08-05T00:00:00.000Z',
          location: 'Old Location',
          description: 'Old Description'
        });

      const response = await request(app)
        .put(`/api/events/${createdEvent.body._id}`)
        .send({
          name: 'Updated Event Name',
          location: 'New Location',
          description: 'New Description'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('name', 'Updated Event Name');
    });

    it('should return 400 for invalid data', async () => {
      const event = await new Event({
        name: 'Event To Update',
        date: '2024-08-05T00:00:00.000Z',
        location: 'Old Location',
        description: 'Old Description'
      }).save();

      const response = await request(app)
        .put(`/api/events/${event._id}`)
        .send({ name: '' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('msg');
    });
  });

  describe('DELETE /api/events/:id', () => {
    it('should delete an event by ID', async () => {
      const event = await new Event({
        name: 'Event To Delete',
        date: '2024-08-05T00:00:00.000Z',
        location: 'Location To Delete',
        description: 'Description To Delete'
      }).save();

      const response = await request(app).delete(`/api/events/${event._id}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('msg', 'Event removed');
    });

    it('should return 404 for non-existent ID', async () => {
      const response = await request(app).delete('/api/events/64a1d2041c4b0a4d1e4e1c0a');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('msg', 'Event not found');
    });
  });
});
