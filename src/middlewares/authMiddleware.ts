import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';

interface DecodedToken {
  id: string; // Adjust this based on the payload you include in the token
  // Add other fields if you include them in the token payload
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Type assertion here
    (req as Request & { user?: DecodedToken }).user = decoded as DecodedToken;
    next();
  });
};

export default authMiddleware;
