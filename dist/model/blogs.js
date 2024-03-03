"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const blogsSchema = new mongoose_1.default.Schema({
    blogTitle: { type: String, required: true },
    blogDescription: { type: String, required: true },
    blogImage: { type: String, required: true },
    CreatedDate: { type: Date, default: Date.now },
    Likes: { type: Number, default: 0 },
    disLikes: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "USER" }]
});
const Blog = mongoose_1.default.model("Blogs", blogsSchema);
exports.Blog = Blog;
