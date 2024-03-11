import  { Request,Response } from "express";
import  Messages  from "../model/messages";
import { successMessage } from "../utils/successMessage";
import { errorMessage } from "../utils/errorMessage";
class messageController{
    public static async postMessage(req:Request,res:Response):Promise<void>{
        const{email,message}=req.body
        try {
            const messages = await Messages.create({email,message})
            if(messages){
                return successMessage(res,200,`message sent successfully`,messages)
            }else{
                return errorMessage(res,401,`message not sent`)
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            return errorMessage(res, 500, `Internal server error`);
        }
    }
    public static async getAllMessage(req:Request,res:Response):Promise<void>{
        try {
            const message = await Messages.find()
            if(message){
                return successMessage(res,200,`all message retrived`,message)
            }else{
                return errorMessage(res,404,`no messages retrived`)
            }
        } catch (error) {
        }
    }
    public static async getOneMessage(req:Request,res:Response):Promise<void>{
        const messageId = req.params.id
        try {
            const message = await Messages.findById(messageId)
            if(message){
                return successMessage(res,200,`message retrived`,message)
            }else{
                return errorMessage(res,404,`no message found`)
            }
        } catch (error) {
        }
    }
    public static async deleteOneMessage(req:Request,res:Response):Promise<void>{
        const messageId = req.params.id
        try {
            const message = await Messages.findByIdAndDelete(messageId)
            if(message){
                return errorMessage(res,200,`message deleted`)
            }else{
                return errorMessage(res,400,`no message retrived`)
            }
        } catch (error) {
        }
    }
}
export {messageController}
