import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true, default: false},
    role: {type: String, enum:['admin', 'user'], default: 'user'}
})

const User = mongoose.model('User', userSchema);

export {User};