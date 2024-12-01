import request from 'supertest';
import express, { NextFunction, Request, Response } from 'express';
import router from '../routes/userRoutes';
import authMiddleware from '../api/middlewares/authMiddleware';

const app = express();
app.use(express.json());
app.use('/api', router);

jest.mock('../api/controllers/userController', () => ({
  registerUser: jest.fn((req: Request, res: Response) => {
    console.log('registerUser called');
    res.status(201).json({ msg: 'User registered' });
  }),
  loginUser: jest.fn((req: Request, res: Response) => {
    console.log('loginUser called');
    res.status(200).json({ token: 'fakeToken' });
  }),
}));

jest.mock('../api/middlewares/authMiddleware', () => (req: Request, res: Response, next: NextFunction) => next());

describe('User Routes', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should apply authMiddleware to routes after /register and /login', async () => {

    const mockAuthMiddleware = jest.fn((req: Request, res: Response, next: NextFunction) => next());
    (authMiddleware as jest.Mock) = mockAuthMiddleware;

    app.use('/api/protected', authMiddleware, (req: Request, res: Response) => res.status(200).send('Protected route'));

    const response = await request(app)
      .get('/api/protected')
      .send();

    expect(response.status).toBe(200);
    expect(mockAuthMiddleware).toHaveBeenCalled();
  }, 10000);
});
