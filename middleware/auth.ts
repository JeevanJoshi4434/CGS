import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { response } from '../utils/response';

// Extend the Express Request interface to include our custom properties
declare global {
    namespace Express {
        interface Request {
            token?: string;
            user?: any;
        }
    }
}

/**
 * Middleware to validate JWT token and set user info in request
 */
export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    // Check for token in headers (case-insensitive) or in the request body
    let token = req.headers['sessiontoken'] as string | undefined;
    
    // If not in headers under 'sessiontoken', check other common header names
    if (!token) {
        token = req.headers['authorization'] as string | undefined;
        
        // If it's in Authorization header, it might be prefixed with 'Bearer '
        if (token && token.startsWith('Bearer ')) {
            token = token.substring(7);
        }
    }
    
    // If still not found, check if it's in the request body
    if (!token && req.body.sessionToken) {
        token = req.body.sessionToken;
    }
    
    // If no token found, return error
    if (!token) {
        return response(res, 400, 'Session token is required', { redirect: process.env.BASE_URL });
    }
    
    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        
        // Set token and decoded user info in request object for use in route handlers
        req.token = token;
        req.user = decoded;
        
        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        return response(res, 401, 'Invalid token', { redirect: process.env.BASE_URL });
    }
};
