import { generateToken } from '../api/utils/tokenUtil';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('generateToken', () => {
  it('should generate a token', () => {
    const userId = '123';
    const token = 'mocked-token';

    (jwt.sign as jest.Mock).mockReturnValue(token);

    const result = generateToken(userId);

    expect(result).toBe(token);
    expect(jwt.sign).toHaveBeenCalledWith({ id: userId }, '4f14465287824f2ef770a1bfb66ad04466df6867b1dae0a794abd946980b37747ac53bb46e5280ca0dd0109c4203d75f575832950d507daa69eacc0b1ac72e7a', { expiresIn: '1h' });
  });
});
