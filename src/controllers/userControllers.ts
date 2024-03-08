import { Request, Response } from 'express';
import { successMessage } from '../utils/successMessage';
import { errorMessage } from '../utils/errorMessage';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../model/user';
import { validateUser,validateupdatedUser } from '../middlewares/validation';


class userController{
    public static async signup(req: Request, res: Response): Promise<Response> {
        try {
          const { username, email, password,role} = req.body;
         
          const userData = await validateUser({ username, email, password,role});
    
          if ('validationErrors' in userData) {
            const { validationErrors } = userData;
            return res.status(400).json({ status:'fail', validationErrors });
          }
          
          const userName = await User.findOne({ username });
          if(userName){
          return res.status(401).json({ status:'failed', message : 'username already exist', userName});
        }
          const user: IUser = await User.create(userData);
          return res.status(201).json({ status:'Success', data: user });
    
        } catch (error) {
          console.error('Error during signup:', error);
          return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    
        }
      }

    public static async  getAllUsers(req:Request, res:Response):Promise<void>{
        const user = await User.find();
        if (user){
            return successMessage(res, 200, `all users found ${user.length}`, user);
        }else{
            return errorMessage(res, 401, 'users not found');
        };
    };
    public static async  getUser(req:Request, res:Response):Promise<void>{
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (user){
            return successMessage(res, 200, 'user found', user);
        }else{
            return errorMessage(res, 401, 'user not found');
        }
    }

    public static async updateUser(req: Request, res: Response): Promise<Response> {
        try {
          const userId: string = req.params.userId;
          const {username, email, password ,role} = req.body;
    
          const updatedUserData = await validateupdatedUser({ username, email, password,role });
    
          if ('validationErrors' in updatedUserData) {
            const { validationErrors } = updatedUserData;
            return res.status(400).json({ status:"fail", validationErrors });
          }
    
                const updatedUser: IUser | null = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
    
          if (!updatedUser) {
            return res.status(404).json({status:'fail', error: 'User not found' });
          }
    
          return res.status(200).json({status:'Success', data: updatedUser});
        } catch (error) {
          console.error('Error updating user:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      }

    public static async deleteUser(req: Request, res: Response): Promise<Response> {
        try {
          const userId: string = req.params.userId;
          const deletedUser: IUser | null = await User.findByIdAndDelete(userId);
          if (!deletedUser) {
            return res.status(404).json({ status: "fail", error: 'User not found' });
          }
          return res.status(200).json({ status: 'Success', message: 'User successfully deleted' });
    
        } catch (error) {
          console.error('Error deleting user and associated comments:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      }

    public static async UserLogin(req: Request, res: Response): Promise<Response> {
        try {
          const { email, password } = req.body;
          const authUser: IUser | null = await User.findOne({ email });
    
          if (!authUser) {
            return res.status(404).json({ error: 'User not found' });
          }
    
          if (authUser.password) {
            const passwordMatch = await compare(password, authUser.password);
    
            if (!passwordMatch) {
              return res.status(401).json({ error: 'Incorrect password' });
            }
    
            const token = jwt.sign({ userId: authUser._id, email: authUser.email, role: authUser.role }, 'mbabazi');
    
    
            return res.status(200).json({ status:"success", user: { _id: authUser._id, username: authUser.username, email: authUser.email, role:authUser.role}, token });
          }
          else {
              return res.status(500).json({ status:"fail", error: 'User password not available' });
          }
      }
      catch (error) {
          console.error('Error during user login:', error);
          return res.status(500).json({ status:"error", error: 'Internal Server Error' });
      }
      }
};
export default userController;
