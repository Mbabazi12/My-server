import mongoose from "mongoose";
const contactSchema = new mongoose.Schema({
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
const Messages = mongoose.model("Contact",contactSchema);
export default Messages ;







