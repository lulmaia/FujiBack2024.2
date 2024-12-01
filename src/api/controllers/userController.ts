import { Request, Response } from 'express';
import { createUser, getUserByEmail } from '../services/userService';
import { verifyCep } from '../services/cepService';
import { generateToken } from '../utils/tokenUtil';
import { validate } from '../middlewares/validationMiddleware';
import { userSchema } from '../validators/userValidator';

export const registerUser = [
  validate(userSchema),
  async (req: Request, res: Response) => {
    const { email, password, cep } = req.body;
    try {
      const isValidCep = await verifyCep(cep);
      if (!isValidCep) {
        return res.status(400).json({ msg: 'Invalid CEP' });
      }

      const user = await createUser(email, password, cep);
      if (!user || typeof user.id !== 'string') {
        throw new Error('Invalid user ID');
      }
      const token = generateToken(user.id);
      res.status(201).json({ token });
    } catch (error) {
      console.error('Error registering user:', error);
      if (error instanceof Error) {
        res.status(500).json({ msg: error.message });
      } else {
        res.status(500).json({ msg: 'Server error' });
      }
    }
  },
];

export const loginUser = [
  validate(userSchema),
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await getUserByEmail(email);
      if (!user || !(await user.comparePassword(password))) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
      if (typeof user.id !== 'string') {
        throw new Error('Invalid user ID');
      }
      const token = generateToken(user.id);
      res.json({ token });
    } catch (error) {
      console.error('Error logging in user:', error);
      if (error instanceof Error) {
        res.status(500).json({ msg: error.message });
      } else {
        res.status(500).json({ msg: 'Server error' });
      }
    }
  },
];
