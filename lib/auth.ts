import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
