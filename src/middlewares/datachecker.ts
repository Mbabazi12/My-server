import express, {Request,Response, NextFunction } from "express";
import { User } from "../model/user";
import { errorMessage } from "../utils/errorMessage";
class dataChecker{
    public static async inputIsEmpty(req:Request, res:Response,next : NextFunction) :Promise<void> {
    const {username,email,passWord} = req.body
    if(username ==""){
        return errorMessage(res,401,`username is empty please fill in something`)
    }else if(email == ""){
        return errorMessage(res,401,`email is empty please fill in the email`)
    }
    else if(passWord == ""){
        return errorMessage(res,401,`password is empty please fill`)
    }
    else{
        next()
    }
    }

public static async EmailExist(req:Request,res:Response,next:NextFunction):Promise<void>{
    const {email}=req.body
    const user = await User.findOne({email})
    if(user){
        return errorMessage(res,500,`email exist`)
    }else {
        next()
    }
}
}
export { dataChecker }