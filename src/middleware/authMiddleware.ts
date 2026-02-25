import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export type AuthRequest = Request & { user?: { _id: string } }; // Extend Express Request to include user property
const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    // Your authentication logic here
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token from the "Bearer <token>" format
    // Here you would typically verify the token and extract user information
    // For example, using jwt.verify(token, secret) if you're using JWTs
    const secret: string = process.env.JWT_SECRET as string;

    // If the token is valid, you can attach the user information to the request object
    try {
        const decodedUserInfo = jwt.verify(token, secret) as { userId: string };
        req.user = { _id: decodedUserInfo.userId }; // Attach user info to request object for use in controllers
        next(); // Call the next middleware or route handler
    }
    catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

};

export default authMiddleware;