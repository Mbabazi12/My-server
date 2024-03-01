import Jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { errorMessage } from "../utils/errorMessage";
import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
    user?: UserPayload; 
}

interface UserPayload {
    role: string;
    id: number;
}

const VerifyAccess = (passrole: string) => {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        const token = req.headers["authorization"];
        if (!token || Array.isArray(token)) {
            return errorMessage(res, 401, `No valid token provided`);
        }

        const secretKey = process.env.JWT_SECRET_KEY;
        if (!secretKey) {
            return errorMessage(res, 500, `Secret key is not defined`);
        }

        try {
            const verifyToken = Jwt.verify(token, secretKey) as UserPayload;
            req.user = verifyToken; 
            if (passrole !== verifyToken.role) {
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
            return errorMessage(res, 500, `Server Error: ${(error as Error).message}`);
        }
    };
};

export default VerifyAccess;
