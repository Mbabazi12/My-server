import { Response } from 'express';

const success = (res: Response<any>, status: number, message: string, data: any): void => {
    res.status(status).json({
        message: message,
        data: data
    });
};

export { success };