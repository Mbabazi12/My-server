"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogsControllers_1 = __importDefault(require("../controllers/blogsControllers"));
// import middleware from '../middlewares/blogsMiddlewares';
const verifyAccess_1 = __importDefault(require("../middlewares/verifyAccess"));
const router = express_1.default.Router();
router.post('/create', (0, verifyAccess_1.default)('admin'), blogsControllers_1.default.createBlog);
router.get('/get', blogsControllers_1.default.getAllBlogs);
router.get('/:id', blogsControllers_1.default.getBlog);
router.delete('/:id', (0, verifyAccess_1.default)("admin"), blogsControllers_1.default.deleteBlog);
router.delete('/delete', (0, verifyAccess_1.default)("admin"), blogsControllers_1.default.deleteAllBlogs);
router.patch('/:id', (0, verifyAccess_1.default)("admin"), blogsControllers_1.default.updateBlog);
router.post("/like/:id", blogsControllers_1.default.likeBlog);
router.post("/unlike/:id", blogsControllers_1.default.dislikeBlog);
exports.default = router;
