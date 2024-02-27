import express, { Response } from 'express'
const success = (res: Response, status: number, message: string,): void => {
    res.status(status).json({
        message: message
    });
}
export { success };