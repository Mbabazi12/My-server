import { Response } from 'express';

const loginMessage = (res:Response, status: number, message: string, token: string): void => {
    res.status(status).json({
        message: message,
        token: token
    });
};

export {loginMessage};