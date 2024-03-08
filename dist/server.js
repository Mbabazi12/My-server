"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const userControllers_1 = __importDefault(require("./controllers/userControllers"));
const blogsControllers_1 = __importDefault(require("./controllers/blogsControllers"));
const commentController_1 = __importDefault(require("./controllers/commentController"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    res.status(200).send({ message: "Welcome to our first API" });
});
// users endpoints
app.post('/create', userControllers_1.default.signup);
app.post('/login', userControllers_1.default.UserLogin);
app.get('/', userControllers_1.default.getUser);
app.get('/get', userControllers_1.default.getAllUsers);
app.delete('/', userControllers_1.default.deleteUser);
app.patch('/', userControllers_1.default.updateUser);
// blogs endpoints
app.post('/create', blogsControllers_1.default.createBlog);
app.get('/', blogsControllers_1.default.getBlog);
app.get('/get', blogsControllers_1.default.getAllBlogs);
app.delete('/', blogsControllers_1.default.deleteBlog);
app.delete('/delete', blogsControllers_1.default.deleteAllBlogs);
app.patch('/', blogsControllers_1.default.updateBlog);
// comments endpoints
app.post('/addComment', commentController_1.default.addComment);
app.get('/getComment', commentController_1.default.Comments);
app.delete('/delete', commentController_1.default.deleteComment);
exports.default = app;
