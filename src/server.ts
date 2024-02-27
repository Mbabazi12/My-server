import express, { Request, Response } from "express";
import blogsRoutes from "./routes/blogsRoutes";
import userRoutes from "./routes/userRoutes";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";


const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/blog', blogsRoutes);
app.get("/", (req: Request, res: Response) => {
    res.status(200).send({message: "Welcome to our first API"});
});
app.use('/user', userRoutes);

export default app;