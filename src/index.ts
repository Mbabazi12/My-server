import express, {Express, Request, Response } from "express";
import mongoose from "mongoose";
import router from "./routes/Index";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerOutPut from './documentation/swagger_output.json';


const app = express();
const corsOpts = {
    origin: '*',
    methods: [
    'GET',
    'POST',
    'DELETE',
    'PATCH',
    'PUT'
    ],
    allowedHeaders: [
    'Content-Type',
    'Authorization',
    ],
    };
app.use(cors(corsOpts));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutPut));

const port = process.env.PORT || 8080;
app.use(express.json());
app.use('/API/v1',router);
// dbConnect();
async function server() {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });

    mongoose.set('strictQuery', true);
   mongoose.connect("mongodb+srv://mbabazi069:mbabazi@cluster0.wnkbwfn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
//    mongoose.connect("mongodb://localhost:27017/")
   .then(() => {
    console.log('connected to the database');
 }).catch((err) => {
    console.log('error', err);
 });
};
server();
