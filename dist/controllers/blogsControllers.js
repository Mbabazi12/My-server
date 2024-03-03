"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const blogs_1 = require("../model/blogs");
const successMessage_1 = require("../utils/successMessage");
const errorMessage_1 = require("../utils/errorMessage");
class blogController {
    static createBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { blogTitle, blogDescription, blogImage } = req.body;
            const blog = yield blogs_1.Blog.create({ blogTitle, blogDescription, blogImage });
            if (blog) {
                return (0, successMessage_1.successMessage)(res, 200, 'Blog created', blog);
            }
            else {
                return (0, errorMessage_1.errorMessage)(res, 401, 'Blog not created');
            }
        });
    }
    static getAllBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield blogs_1.Blog.find();
            if (blog) {
                return (0, successMessage_1.successMessage)(res, 200, `all Blogs found ${blog.length}`, blog);
            }
            else {
                return (0, errorMessage_1.errorMessage)(res, 401, 'Blogs not found');
            }
        });
    }
    static getBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const blog = yield blogs_1.Blog.findById(userId);
            if (blog) {
                return (0, successMessage_1.successMessage)(res, 200, 'Blog found', blog);
            }
            else {
                return (0, errorMessage_1.errorMessage)(res, 401, 'Blog not found');
            }
        });
    }
    static updateBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const blog = yield blogs_1.Blog.findByIdAndUpdate(userId, req.body, { new: true });
            if (blog) {
                return (0, successMessage_1.successMessage)(res, 200, 'Blog updated', blog);
            }
            else {
                return (0, errorMessage_1.errorMessage)(res, 401, 'Blog not updated');
            }
        });
    }
    static deleteBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const blog = yield blogs_1.Blog.findByIdAndDelete(userId);
            if (blog) {
                return (0, successMessage_1.successMessage)(res, 200, 'Blog deleted successfully', blog);
            }
            else {
                return (0, errorMessage_1.errorMessage)(res, 401, 'Blog not deleted');
            }
        });
    }
    static deleteAllBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield blogs_1.Blog.deleteMany();
            if (blog) {
                return (0, errorMessage_1.errorMessage)(res, 200, 'all Blogs deleted');
            }
            else {
                return (0, errorMessage_1.errorMessage)(res, 401, 'Blogs not deleted');
            }
        });
    }
    static likeBlog(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blog = yield blogs_1.Blog.findById((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id);
                if (!blog) {
                    return (0, errorMessage_1.errorMessage)(res, 201, `blogs not found`);
                }
                blog.Likes++;
                yield blog.save();
                return (0, successMessage_1.successMessage)(res, 200, `blogs liked`, blog);
            }
            catch (error) {
                console.log('error from liked');
            }
        });
    }
    static dislikeBlog(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blog = yield blogs_1.Blog.findById((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id);
                if (!blog) {
                    return (0, errorMessage_1.errorMessage)(res, 201, `blogs not liked`);
                }
                else {
                    blog.Likes = (blog.Likes || 0) - 1;
                }
                if (blog.Likes < 0) {
                    blog.Likes = 0;
                }
                yield blog.save();
                return (0, successMessage_1.successMessage)(res, 200, `blogs unliked successfully`, blog);
            }
            catch (error) {
                console.log('error from likes', error);
            }
        });
    }
}
exports.default = blogController;
