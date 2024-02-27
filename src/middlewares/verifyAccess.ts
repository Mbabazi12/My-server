import Jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { errorMessage } from "../utils/errorMessage";
import express, {Request,Response, NextFunction } from "express";
interface UserPayload {
    user: {
        role: string;
        id: number;
    };
    admin: {
        role: string;
    };
}
declare module 'express' {
    interface Request {
        user?: UserPayload;
    }
}
const VerifyAccess = (passrole: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers["andela"];
        if (!token || Array.isArray(token)) {
            return errorMessage(res, 401, `No valid token provided`);
        }
        const secretKey = 'mbabazi';
        if (!secretKey) {
            return errorMessage(res, 500, `Secret key is not defined`);
        }
        try {
            const verifyToken = Jwt.verify(token, secretKey) as UserPayload;
            req.user = verifyToken;
            if (passrole !== verifyToken.user.role) {
                return errorMessage(res, 403, `You don't have access`);
            } else {
                next();
            }
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                return errorMessage(res, 401, `Token expired`);
            } else if (error instanceof JsonWebTokenError) {
                return errorMessage(res, 401, `Invalid token`);
            }
             return errorMessage(res, 500, `Server Error: ${(error as Error).message}`)
        }
    };
};
export default VerifyAccess;