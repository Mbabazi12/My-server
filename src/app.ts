import express,{Application, Request, Response, NextFunction} from "express";

const app: Application = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.status(200).send({message: "Welcome to our first API"});
});

export default app;