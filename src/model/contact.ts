import mongoose from "mongoose";
const contactSchema = new mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId,ref:"User",required : true},
    message : {type:String, required : true},
    blogs:{type: mongoose.Schema.Types.ObjectId,ref:"Blog",required : true},
})
const Contact = mongoose.model('Contact',contactSchema);
export { Contact };