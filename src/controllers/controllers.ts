import { Request, Response } from 'express';
import Test from '../testing/testing';

export function getUsers(req: Request, res: Response): void {
    res.json({ message: 'Get all users' });
}

export function getUser(req: Request, res: Response): void {
    const userId = req.params.id;
    res.json({ message: `Get user with ID ${userId}` });
}

export function createUser(req: Request, res: Response): void {
    res.json({ message: 'Create a new user' });
}

export function updateUser(req: Request, res: Response): void {
    const userId = req.params.id;
    res.json({ message: `Update user with ID ${userId}` });
}

export function deleteUser(req: Request, res: Response): void {
    const userId = req.params.id;
    res.json({ message: `Delete user with ID ${userId}` });
}

const controllers = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};

export default controllers;
