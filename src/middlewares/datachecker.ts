import express, {Request,Response, NextFunction } from "express";
import {User} from "../model/user";
import { errorMessage } from "../utils/errorMessage";
class dataChecker{
    public static async inputIsEmpty(req:Request, res:Response,next : NextFunction) :Promise<Response> {
    const {username,email,passWord} = req.body
    if(username ==""){
        return res.status(401).json({ status:'failed', error : 'username required'});
    }else if(email == ""){
        return res.status(401).json({ status:'failed', error : 'Email required'});
    }
    else if(passWord == ""){
        return res.status(401).json({ status:'failed', error : 'Password required'});
    }
    else{
        next()
    }
    return res.status(201).json({ status:'success',});
}

    public static async EmailExist(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({ status:'failed', error : 'Email already exist'});
        } else {
            next();
        }
        return res.status(201).json({ status:'success',});
    }    
}
export { dataChecker }