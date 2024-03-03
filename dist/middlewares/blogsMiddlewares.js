"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const blogsControllers_1 = __importDefault(require("../controllers/blogsControllers"));
const verifyAccess_1 = __importDefault(require("./verifyAccess"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)();
router.post('/', (0, verifyAccess_1.default)('admin'), upload.none(), blogsControllers_1.default.createBlog);
exports.default = router;
