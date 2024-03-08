import express, { Router } from 'express';
import blogController from '../controllers/blogsControllers';
// import middleware from '../middlewares/blogsMiddlewares';
import VerifyAccess from '../middlewares/verifyAccess';

const router: Router = express.Router();

router.post('/create', VerifyAccess('admin'), blogController.createBlog);
router.get('/get', blogController.getAllBlogs);
router.get('/:id', blogController.getBlog);
router.delete('/:id', VerifyAccess("admin"), blogController.deleteBlog);
router.delete('/delete', VerifyAccess("admin"), blogController.deleteAllBlogs);
router.patch('/:id', VerifyAccess("admin"), blogController.updateBlog);
router.post("/like/:id",blogController.likeBlog);
router.post("/unlike/:id",blogController.dislikeBlog);

export default router;