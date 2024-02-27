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
        return successMessage(res,200,`comments found`,comment)
    }
}
public static async deleteComment(req:Request,res:Response):Promise<void>{
    const comment = await Comment.deleteMany()
    if(comment){
        return success(res,201,`comment deleted`)
    }else{
        return errorMessage(res,401,`comment not deleted`)
    }
}
}
export default commentController;