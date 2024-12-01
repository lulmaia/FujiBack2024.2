import connectDB from '../config/db';
import mongoose from 'mongoose';

describe('Database Connection', () => {
  it('should connect to MongoDB successfully', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.spyOn(mongoose, 'connect').mockResolvedValueOnce(true as any);
    await expect(connectDB()).resolves.not.toThrow();
  });
});
