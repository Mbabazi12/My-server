import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
    comment : {type:String, required : true},
    postedAt : {type:Date,default:Date.now()},
    blog:{type: mongoose.Schema.Types.ObjectId,ref:"Blog",required : true},
    user:{type: mongoose.Schema.Types.ObjectId,ref:"User",required : true},
})
const Comment = mongoose.model('Comment',commentSchema)
export { Comment }