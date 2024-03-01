import express, { Router } from 'express';
import blogController from '../controllers/blogsControllers';
import middleware from '../middlewares/blogsMiddlewares';
import VerifyAccess from '../middlewares/verifyAccess';

const router: Router = express.Router();

router.post('/create', middleware, VerifyAccess, blogController.createBlog);
router.get('/:id', blogController.getBlog);
router.get('/get', blogController.getAllBlogs);
router.delete('/:id', VerifyAccess, blogController.deleteBlog);
router.delete('/delete', VerifyAccess, blogController.deleteAllBlogs);
router.patch('/:id', VerifyAccess, blogController.updateBlog);

export default router;