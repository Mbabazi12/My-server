import express, { Request,Response } from "express";
import {Contact} from "../model/contact";
import { success } from "../utils/sucess";
import { successMessage } from "../utils/successMessage";
import { errorMessage } from "../utils/errorMessage";
class contactController{
public static async addmessage(req:Request,res:Response):Promise<void>{
    const message = await Contact.create(req.body)
    if(message){
        return successMessage(res,200,`message added`,message)
    }
}
public static async getAllMessages(req:Request,res:Response):Promise<void>{
    const message = await Contact.find()
    if(message){
        return successMessage(res,200,`messages found`,message)
    }
}
public static async deleteAllMessages(req:Request,res:Response):Promise<void>{
    const message = await Contact.deleteMany()
    if(message){
        return success(res,201,`messages deleted`)
    }else{
        return errorMessage(res,401,`messages not deleted`)
    }
}
}
export default contactController;