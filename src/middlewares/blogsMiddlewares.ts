import express from "express";
import multer from "multer";
import blogController from "../controllers/blogsControllers";
import VerifyAccess from "./verifyAccess";

const router = express.Router();
const upload = multer();

router.post('/', VerifyAccess('admin'), upload.none(), blogController.createBlog);

export default router;
