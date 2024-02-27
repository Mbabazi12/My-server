import express, {Router} from 'express';
import userRoutes from './userRoutes';
import blogsRoutes from './blogsRoutes';
import commentsRoutes from './commentsRoutes'

const router:Router = express.Router()

router.use('/user', userRoutes);
router.use('/blog', blogsRoutes);
router.use('/comment', commentsRoutes);

export default router;
// import authentication from './authentication';
// // import users from './users';

// const router = express.Router();
// router.use('/user',authentication)

// // export default (): express.Router => {
// //     authentication(router);
// //     users(router);
    
// //     return router;
// // };

// export default router;