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
const corsOptions = {
    origin: 'http://127.0.0.1:5500/signup.html#',
    optionsSuccessStatus: 200 
  };
app.use(cors(corsOptions));

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
    // const brand = 'mongodb+srv://mbabazi069:mbabazi@mbabazi.l7tt475.mongodb.net/my_brand'
    const brand = 'mongodb://localhost:27017/my_brand'
        await mongoose.connect(brand).then(()=>{
            console.log('database connected successfully');
        }).catch((error)=>{
            console.log(`database connection failed${error}`);
        });
    
    };
server();


