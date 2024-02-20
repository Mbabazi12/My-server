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
    const brand = 'mongodb://localhost:27017/my_brand'
    try {
        await mongoose.connect(brand)
        console.log('database successfully connected')
    } catch (error) {
        console.log('database connection failed',error)
    }
}
server()