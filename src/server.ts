import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import userController from "./controllers/userControllers";
import blogController from "./controllers/blogsControllers";


const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.get("/", (req: Request, res: Response) => {
    res.status(200).send({message: "Welcome to our first API"});
});
// users endpoint
app.post('/create', userController.createUser);
app.post('/login', userController.login);
app.get('/', userController.getUser);
app.get('/get', userController.getAllUsers);
app.delete('/', userController.deleteUser);
app.delete('/delete', userController.deleteAllUser);
app.patch('/', userController.updateUser)
// blogs endpoints
app.post('/create', blogController.createBlog);
app.get('/', blogController.getBlog);
app.get('/get', blogController.getAllBlogs);
app.delete('/', blogController.deleteBlog);
app.delete('/delete', blogController.deleteAllBlogs);
app.patch('/', blogController.updateBlog)
export default app;