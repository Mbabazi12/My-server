import express, { Router } from 'express';
import controllers from '../controllers/blogsControllers';
import middleware from '../middlewares/blogsMiddlewares';
import VerifyAccess from '../middlewares/verifyAccess';

const router: Router = express.Router();

router.post('/', middleware, VerifyAccess, controllers.createBlog);
router.get('/:id', controllers.getBlog);
router.get('/', controllers.getAllBlogs);
router.delete('/:id', VerifyAccess, controllers.deleteBlog);
router.delete('/', VerifyAccess, controllers.deleteAllBlogs);
router.patch('/:id', VerifyAccess, controllers.updateBlog);

export default router;