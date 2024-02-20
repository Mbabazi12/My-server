import { Request, Response } from 'express';
import { User } from '../model/user';
import { successMessage } from '../utils/successMessage';
import { errorMessage } from '../utils/errorMessage';

class controllers{
    public static async  createUser(req:Request, res:Response):Promise<void>{
        const user = await User.create(req.body)
        if (user){
            return successMessage(res, 200, 'user created', user)
        }
        else{
            return errorMessage(res, 201, 'user not created')
        }
    }

    public static async  getAllUser(req:Request, res:Response):Promise<void>{
        const user = await User.find()
        if (user){
            return successMessage(res, 200, `all users found ${user.length}`, user)
        }
        else{
            return errorMessage(res, 201, 'users not found')
        }
    }

    public static async  getUser(req:Request, res:Response):Promise<void>{
        const userId = req.params.id
        const user = await User.findById(userId)
        if (user){
            return successMessage(res, 200, 'user found', user)
        }
        else{
            return errorMessage(res, 201, 'user not found')
        }
    }

    public static async  updateUser(req:Request, res:Response):Promise<void>{
        const userId = req.params.id
        const user = await User.findByIdAndUpdate(userId, req.body, {new: true})
        if (user){
            return successMessage(res, 200, 'user updated', user)
        }
        else{
            return errorMessage(res, 201, 'user not updated')
        }
    }

    public static async  deleteUser(req:Request, res:Response):Promise<void>{
        const userId = req.params.id
        const user = await User.findByIdAndDelete(userId)
        if (user){
            return successMessage(res, 200, 'user deleted successfully', user)
        }
        else{
            return errorMessage(res, 201, 'user not deleted')
        }
    }

    public static async  deleteAllUser(req:Request, res:Response):Promise<void>{
        const user = await User.deleteMany()
        if (user){
            return errorMessage(res, 200, 'all users deleted')
        }
        else{
            return errorMessage(res, 201, 'users not deleted')
        }
    }
}

export default controllers;
