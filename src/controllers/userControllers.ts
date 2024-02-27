import { Request, Response } from 'express';
import { User } from '../model/user';
import { successMessage } from '../utils/successMessage';
import { errorMessage } from '../utils/errorMessage';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { loginMessage } from '../utils/loginMessage';

class controllers{
    public static async createUser(req: Request, res: Response): Promise<void> {
        const { username, email, password, role } = req.body;
        if (!password) {
            return errorMessage(res, 400, 'Password is required');
        }
    
        const hashPassword = bcrypt.hashSync(password, 10);
        const user = await User.create({ username, email, password: hashPassword, role });
        if (user) {
            return successMessage(res, 200, 'User created', user);
        } else {
            return errorMessage(res, 500, 'Failed to create user');
        }
    }
    

    public static async  getAllUsers(req:Request, res:Response):Promise<void>{
        const user = await User.find()
        if (user){
            return successMessage(res, 200, `all users found ${user.length}`, user)
        }
        else{
            return errorMessage(res, 401, 'users not found')
        }
    }

    public static async  getUser(req:Request, res:Response):Promise<void>{
        const userId = req.params.id
        const user = await User.findById(userId)
        if (user){
            return successMessage(res, 200, 'user found', user)
        }
        else{
            return errorMessage(res, 401, 'user not found')
        }
    }

    public static async  updateUser(req:Request, res:Response):Promise<void>{
        const userId = req.params.id
        const user = await User.findByIdAndUpdate(userId, req.body, {new: true})
        if (user){
            return successMessage(res, 200, 'user updated', user)
        }
        else{
            return errorMessage(res, 401, 'user not updated')
        }
    }

    public static async  deleteUser(req:Request, res:Response):Promise<void>{
        const userId = req.params.id
        const user = await User.findByIdAndDelete(userId)
        if (user){
            return successMessage(res, 200, 'user deleted successfully', user)
        }
        else{
            return errorMessage(res, 401, 'user not deleted')
        }
    }

    public static async  deleteAllUser(req:Request, res:Response):Promise<void>{
        const user = await User.deleteMany()
        if (user){
            return errorMessage(res, 401, 'all users deleted')
        }
        else{
            return errorMessage(res, 401, 'users not deleted')
        }
    }

    public static async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        const secretKey = 'mbabazi';
        try {
            if(!secretKey){
                return errorMessage(res, 500, 'secret key not defined')
            }
            const user = await User.findOne({email});
            if(!user){
                return errorMessage(res, 500, 'Invalid email or password')
            }else{
                const comparePassword = bcrypt.compareSync(password, user.password)
                if(!comparePassword){
                    return errorMessage(res, 401, 'invalid email or password');
                }else{
                    const token = jwt.sign({user: user}, secretKey, {expiresIn: '1d'})
                    if(token){
                        return loginMessage(res, 201, 'token found', user, token)
                    }else{
                        return errorMessage(res, 401, 'token not found');
                    }
                }
            }
        } catch (error) {
            console.log(error);
            return errorMessage(res, 500, 'internal server error');
            
        }
    }
}

export default controllers;
