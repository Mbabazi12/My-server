import { Response } from 'express';

const loginMessage = (res:Response, status: number, message: string, data: any, token: string): void => {
    res.status(status).json({
        message: message,
        data: data,
        token: token,
    });
};

export {loginMessage};