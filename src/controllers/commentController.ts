import express, { Request,Response } from "express";
import {Comment} from "../model/comments";
import { success } from "../utils/sucess";
import { successMessage } from "../utils/successMessage";
import { errorMessage } from "../utils/errorMessage";
class commentController{
public static async addComment(req:Request,res:Response):Promise<void>{
    const comment = await Comment.create(req.body)
    if(comment){
        return successMessage(res,200,`comment added`,comment)
    }
}
public static async Comments(req:Request,res:Response):Promise<void>{
    const comment = await Comment.find()
    if(comment){
        return success(res,200,`comments found`,comment)
    }
}
public static async deleteMessages(req:Request,res:Response):Promise<void>{
    const messageId = req.params.id
    const comment = await Comment.findByIdAndDelete(messageId)
    if(comment){
        return success(res,201,`messages deleted`,comment)
    }else{
        return errorMessage(res,401,`messages not deleted`)
    }
}
public static async deleteComment(req:Request,res:Response):Promise<void>{
    const comment = await Comment.deleteMany()
    if(comment){
        return success(res,201,`comment deleted`, comment)
    }else{
        return errorMessage(res,401,`comment not deleted`)
    }
}
}
export default commentController;