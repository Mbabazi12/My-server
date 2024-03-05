import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import userController from "./controllers/userControllers";
import blogController from "./controllers/blogsControllers";
import commentController from "./controllers/commentController";


const app = express();

app.use(cors());

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.get("/", (req: Request, res: Response) => {
    res.status(200).send({message: "Welcome to our first API"});
});
// users endpoints
app.post('/create', userController.createUser);
app.post('/login', userController.login);
app.get('/', userController.getUser);
app.get('/get', userController.getAllUsers);
app.delete('/', userController.deleteUser);
app.delete('/delete', userController.deleteAllUser);
app.patch('/', userController.updateUser);
// blogs endpoints
app.post('/create', blogController.createBlog);
app.get('/', blogController.getBlog);
app.get('/get', blogController.getAllBlogs);
app.delete('/', blogController.deleteBlog);
app.delete('/delete', blogController.deleteAllBlogs);
app.patch('/', blogController.updateBlog);
// comments endpoints
app.post('/addComment', commentController.addComment);
app.get('/getComment', commentController.Comments);
app.delete('/delete', commentController.deleteComment);
export default app;