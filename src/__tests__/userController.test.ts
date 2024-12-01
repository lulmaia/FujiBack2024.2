import request from 'supertest';
import app from '../server';
import { createUser, getUserByEmail } from '../api/services/userService';
import { generateToken } from '../api/utils/tokenUtil';

jest.mock('../api/services/userService');
jest.mock('../api/utils/tokenUtil');

describe('User Controller', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should register a user with valid data', async () => {
    (createUser as jest.Mock).mockResolvedValue({ id: '123' });
    (generateToken as jest.Mock).mockReturnValue('fakeToken');

    const response = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(response.status).toBe(201);
    expect(response.body.token).toBe('fakeToken');
  });

  test('should return 400 for invalid registration data', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({ email: 'invalid-email', password: '' });

    expect(response.status).toBe(400);
    expect(response.body.msg).toBeDefined();
  });

  test('should login a user with valid credentials', async () => {
    (getUserByEmail as jest.Mock).mockResolvedValue({
      id: '123',
      comparePassword: jest.fn().mockResolvedValue(true),
    });
    (generateToken as jest.Mock).mockReturnValue('fakeToken');

    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body.token).toBe('fakeToken');
  });

  test('should return 500 if user registration fails', async () => {
    (createUser as jest.Mock).mockRejectedValue(new Error('Database error'));

    const response = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(response.status).toBe(500);
    expect(response.body.msg).toBe('Database error');
  });

  test('should generate a token on successful registration', async () => {
    (createUser as jest.Mock).mockResolvedValue({ id: '123' });
    (generateToken as jest.Mock).mockReturnValue('generatedToken');

    const response = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(response.status).toBe(201);
    expect(response.body.token).toBe('generatedToken');
  });

  test('should return 400 for invalid credentials', async () => {
    (getUserByEmail as jest.Mock).mockResolvedValue({
      id: '123',
      comparePassword: jest.fn().mockResolvedValue(false),
    });

    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'wrongPassword' });

    expect(response.status).toBe(400);
    expect(response.body.msg).toBe('Invalid credentials');
  });

});
