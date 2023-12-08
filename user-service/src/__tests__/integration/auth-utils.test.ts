import { comparePasswords, generateJWT } from '../../utils/auth-utils';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

describe('comparePasswords', () => {
  it('should return true for matching passwords', async () => {
    const plainPassword = 'password123';
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    const result = await comparePasswords(plainPassword, hashedPassword);
    expect(result).toBe(true);
  });

  it('should return false for non-matching passwords', async () => {
    const plainPassword = 'password123';
    const hashedPassword = await bcrypt.hash('differentPassword', 10);
    const result = await comparePasswords(plainPassword, hashedPassword);
    expect(result).toBe(false);
  });
});

describe('generateJWT', () => {
  it('should return a valid JWT for a user', () => {
    const user: any = {
      _id: 'user-id',
      email: 'user@example.com',
      username: 'username',
      password: 'password',
      currency: 0,
    };

    const token = generateJWT(user);
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
    expect(decoded).toMatchObject({ userId: user._id, email: user.email });
  });
});
