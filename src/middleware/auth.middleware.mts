import { Request, Response, NextFunction } from 'express';

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
    if (req.session && req.session.userId) {
        // User is authenticated
        next();
    } else {
        // User is not authenticated
        res.status(401).send({
            success: false,
            message: "Unauthorized. Please log in."
        });
    }
};