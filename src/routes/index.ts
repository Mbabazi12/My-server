import express, {Router} from 'express';
import userRoutes from './userRoutes';
import blogsRoutes from './blogsRoutes';
import commentsRoutes from './commentsRoutes';
import contactRoutes from './contactRoutes';

const router:Router = express.Router()

router.use('/user', 
/*
#swagger.tags = ['USERS Routes']
*/
userRoutes);

router.use('/blog',
/*
#swagger.tags = ['BLOGS Routes']
*/
 blogsRoutes);

router.use('/comment',
/*
#swagger.tags = ['COMMENTS Routes']
*/
commentsRoutes);

router.use('/contact',
/*
#swagger.tags = ['MEASSAGE Routes']
*/
contactRoutes);

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