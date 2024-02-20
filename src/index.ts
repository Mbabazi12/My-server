import express, {Express, Request, Response } from "express";
import mongoose from "mongoose";
import router from "./routes/index";



const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());
app.use('/API/v1',router)
// dbConnect();
async function server() {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
    // const brand = 'mongodb+srv://mbabazi069:mbabazi@mbabazi.l7tt475.mongodb.net/my_brand'
    const brand = 'mongodb+srv://transport:code2023@cluster0.kcorbgx.mongodb.net/?retryWrites=true&w=majority'
    // const brand = 'mongodb://localhost:27017/my_brand'
        await mongoose.connect(brand).then(()=>{
            console.log('database connected successfully')
        }).catch((error)=>{
            console.log(`database connection failed${error}`)
        })
    
    }
server()