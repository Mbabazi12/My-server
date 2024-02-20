import { Response } from 'express';

const errorMessage = (res:Response, status: number, message: string): void => {
    res.status(status).json({
        message: message
    })
}

export {errorMessage}