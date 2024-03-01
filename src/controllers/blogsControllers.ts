import { Request, Response } from 'express';
import { Blog } from '../model/blogs';
import { successMessage } from '../utils/successMessage';
import { errorMessage } from '../utils/errorMessage';

class blogController{
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
    public static async likeBlog(req: Request, res: Response): Promise<void> {
        try {
            const blog = await Blog.findById(req?.params?.id);
            if (!blog) {
               return errorMessage(res,201,`blogs not found`)
            }
            blog.Likes++;
            await blog.save();
          return successMessage(res,200,`blogs liked`,blog)
        } catch (error) {
            console.log('error from liked')
        }
    }
    public static async dislikeBlog(req: Request, res: Response): Promise<void> {
        try {
            const blog = await Blog.findById(req?.params?.id);
            if (!blog) {
                return errorMessage(res, 201, `blogs not liked`);
            } else {
                blog.Likes = (blog.Likes || 0) - 1;
            }
            if (blog.Likes < 0) {
                blog.Likes = 0;
            }
            await blog.save();
            return successMessage(res, 200, `blogs unliked successfully`, blog);
        } catch (error) {
            console.log('error from likes', error);
        }
    }
}


export default blogController;
