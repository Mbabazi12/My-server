import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId,ref:"User",required : true},
    blog:{type: mongoose.Schema.Types.ObjectId,ref:"Blog",required : true},
    comment : {type:String, required : true},
    postedAt : {type:Date,default:Date.now()},
})
const Comment = mongoose.model('Comment',commentSchema);
export { Comment };