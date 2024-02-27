import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
    comment : {
        type:String,
        required : true
    },
    postedAt : {
        type:Date,
        default:Date.now()
    },
    blogs:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Blogs",
        required : true
    },
    users:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"USER",
        required : true
    },
})
const Comment = mongoose.model('Comment',commentSchema)
export { Comment }