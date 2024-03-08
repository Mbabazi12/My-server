import Jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { errorMessage } from "../utils/errorMessage";
import { Request, Response, NextFunction } from "express";
import { userSchema, User } from "../model/user";

interface CustomRequest extends Request {
    user?: UserPayload; 
}

interface UserPayload {
    userId: string ;
    email: string ;
    role: string;
    // id: number;
}

const VerifyAccess = (passrole: string) => {
    return async (req: CustomRequest, res: Response, next: NextFunction) => {
        const token:any = req.headers.authorization?.split(' ')[1];
        if (!token || Array.isArray(token)) {
            return errorMessage(res, 401, `No valid token provided`);
        }

        const secretKey = 'mbabazi';
        if (!secretKey) {
            return errorMessage(res, 500, `Secret key is not defined`);
        }
        console.log(token)
        const verifyToken = Jwt.verify(token, secretKey) as UserPayload;
        console.log(verifyToken)
            req.user = verifyToken;


    try{
        const userId = req.user.userId;
        const user =  await User.findOne({ _id: userId });
        if ('admin' !== user?.role) {
            return errorMessage(res, 403, `You don't have access`);
        } else {
            next();
        } 
    } catch (error){
        return errorMessage(res, 401, 'no user')
    }   
        // try {
        //     const verifyToken = Jwt.verify(token, secretKey) as UserPayload;
        //     req.user = verifyToken;
        //     console.log(verifyToken)
        //     if (passrole !== verifyToken.role) {
        //         return errorMessage(res, 403, `You don't have access`);
        //     } else {
        //         next();
        //     }
        // } catch (error) {
        //     if (error instanceof TokenExpiredError) {
        //         return errorMessage(res, 401, `Token expired`);
        //     } else if (error instanceof JsonWebTokenError) {
        //         console.log(error)
        //         return errorMessage(res, 401, `Invalid token`);
        //     }
        //     return errorMessage(res, 500, `Server Error: ${(error as Error).message}`);
        // }
    };
};

export default VerifyAccess;
