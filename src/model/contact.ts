import mongoose from "mongoose";
const contactSchema = new mongoose.Schema({
    fullName : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true
    },
    message : {
        type:String,
        required:true
    },
    sendAt : {
        type:Date,
       default : Date.now()
    },
})
const Contact = mongoose.model("Contact",contactSchema)
export{ Contact }







