import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwtConfig';
import authMiddleware from '../api/middlewares/authMiddleware';
import { AuthRequest } from '../api/middlewares/authMiddleware';

const app = express();
app.use(express.json());
app.use(authMiddleware);

app.get('/test', (req: AuthRequest, res) => {
  if (req.user) {
    res.status(200).json({ msg: 'Authorized', user: req.user });
  } else {
    res.status(401).json({ msg: 'Unauthorized' });
  }
});

describe('Auth Middleware', () => {
  it('should return 401 if no token is provided', async () => {
    const response = await request(app).get('/test');
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe('No token provided');
  });

  it('should return 401 if token is invalid', async () => {
    const response = await request(app)
      .get('/test')
      .set('Authorization', 'Bearer invalidtoken');
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe('Invalid token format');
  });

  it('should return 200 and user ID if token is valid', async () => {
    const token = jwt.sign({ id: 'testuser' }, jwtConfig.secret, { expiresIn: '1h' });
    const response = await request(app)
      .get('/test')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.msg).toBe('Authorized');
    expect(response.body.user).toBe('testuser');
  });

  it('should return 401 if token is malformed', async () => {
    const malformedToken = 'Bearer ' + 'a'.repeat(10);
    const response = await request(app)
      .get('/test')
      .set('Authorization', malformedToken);
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe('Invalid token format');
  });
});
