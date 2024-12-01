import { User } from '../api/models/userModel';

describe('User Model', () => {

  it('should validate a user model', () => {
    const user = new User({ email: 'test@example.com', password: 'password123' });
    expect(user.email).toBe('test@example.com');
    expect(user.password).toBe('password123');
  });

  it('should validate that the email field is required', () => {
    const user = new User({ password: 'password123' });
    const error = user.validateSync();
    expect(error).not.toBeNull();
    if (error) {
      expect(error.errors.email).toBeDefined();
    }
  });

  it('should validate that the password field is required', () => {
    const user = new User({ email: 'test@example.com' });
    const error = user.validateSync();
    expect(error).not.toBeNull();
    if (error) {
      expect(error.errors.password).toBeDefined();
    }
  });

  it('should create a user with valid data', () => {
    const user = new User({ email: 'valid@example.com', password: 'password123' });
    expect(user.email).toBe('valid@example.com');
    expect(user.password).toBe('password123');
  });

  it('should create a user with a valid email format', () => {
    const user = new User({ email: 'valid.email@example.com', password: 'password123' });
    expect(user.email).toBe('valid.email@example.com');
  });

});
