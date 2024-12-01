import { User } from '../api/models/userModel';
import { createUser, getUserByEmail } from '../api/services/userService';

jest.mock('../api/models/userModel');

describe('User Service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('createUser', () => {
    test('should create a user with valid data', async () => {

      const saveMock = jest.fn().mockResolvedValue({ email: 'test@example.com', password: 'password123' });
      (User.prototype.save as jest.Mock) = saveMock;

      const result = await createUser('test@example.com', 'password123');

      expect(result).toEqual({ email: 'test@example.com', password: 'password123' });
      expect(saveMock).toHaveBeenCalled();
    });

    test('should throw an error if user creation fails', async () => {

      const saveMock = jest.fn().mockRejectedValue(new Error('Database error'));
      (User.prototype.save as jest.Mock) = saveMock;

      await expect(createUser('test@example.com', 'password123')).rejects.toThrow('Error creating user: Database error');
    });
  });

  describe('getUserByEmail', () => {
    test('should return a user if found', async () => {

      const findOneMock = jest.fn().mockResolvedValue({ email: 'test@example.com', password: 'password123' });
      (User.findOne as jest.Mock) = findOneMock;

      const result = await getUserByEmail('test@example.com');

      expect(result).toEqual({ email: 'test@example.com', password: 'password123' });
    });

    test('should return null if no user is found', async () => {

      const findOneMock = jest.fn().mockResolvedValue(null);
      (User.findOne as jest.Mock) = findOneMock;

      const result = await getUserByEmail('nonexistent@example.com');

      expect(result).toBeNull();
    });

    test('should throw an error if retrieving user fails', async () => {

      const findOneMock = jest.fn().mockRejectedValue(new Error('Database error'));
      (User.findOne as jest.Mock) = findOneMock;

      await expect(getUserByEmail('test@example.com')).rejects.toThrow('Error retrieving user by email: Database error');
    });
  });
});
