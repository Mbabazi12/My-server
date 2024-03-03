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
        return success(res,200,`messages found`,message)
    }
}
public static async deleteMessages(req:Request,res:Response):Promise<void>{
    const messageId = req.params.id
    const message = await Contact.findByIdAndDelete(messageId)
    if(message){
        return success(res,201,`messages deleted`,message)
    }else{
        return errorMessage(res,401,`messages not deleted`)
    }
}
public static async deleteAllMessages(req:Request,res:Response):Promise<void>{
    const message = await Contact.deleteMany()
    if(message){
        return successMessage(res,201,`messages deleted`,message)
    }else{
        return errorMessage(res,401,`messages not deleted`)
    }
}
}
export default contactController;