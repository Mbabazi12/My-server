import { Request, Response } from 'express';
import { Blog } from '../model/blogs';
import { successMessage } from '../utils/successMessage';
import { errorMessage } from '../utils/errorMessage';

class controllers{
    public static async  createBlog(req:Request, res:Response):Promise<void>{
        const {blogTitle, blogDescription, blogImage} = req.body;
        const blog = await Blog.create({blogTitle, blogDescription, blogImage})
        if (blog){
            return successMessage(res, 200, 'Blog created', blog)
        }
        else{
            return errorMessage(res, 401, 'Blog not created')
        }
    }

    public static async  getAllBlogs(req:Request, res:Response):Promise<void>{
        const blog = await Blog.find()
        if (blog){
            return successMessage(res, 200, `all Blogs found ${blog.length}`,blog)
        }
        else{
            return errorMessage(res, 401, 'Blogs not found')
        }
    }

    public static async  getBlog(req:Request, res:Response):Promise<void>{
        const userId = req.params.id
        const blog = await Blog.findById(userId)
        if (blog){
            return successMessage(res, 200, 'Blog found', blog)
        }
        else{
            return errorMessage(res, 401, 'Blog not found')
        }
    }

    public static async  updateBlog(req:Request, res:Response):Promise<void>{
        const userId = req.params.id
        const blog = await Blog.findByIdAndUpdate(userId, req.body, {new: true})
        if (blog){
            return successMessage(res, 200, 'Blog updated', blog)
        }
        else{
            return errorMessage(res, 401, 'Blog not updated')
        }
    }

    public static async  deleteBlog(req:Request, res:Response):Promise<void>{
        const userId = req.params.id
        const blog = await Blog.findByIdAndDelete(userId)
        if (blog){
            return successMessage(res, 200, 'Blog deleted successfully', blog)
        }
        else{
            return errorMessage(res, 401, 'Blog not deleted')
        }
    }

    public static async  deleteAllBlogs(req:Request, res:Response):Promise<void>{
        const blog = await Blog.deleteMany()
        if (blog){
            return errorMessage(res, 200, 'all Blogs deleted')
        }
        else{
            return errorMessage(res, 401, 'Blogs not deleted')
        }
    }
}


export default controllers;
