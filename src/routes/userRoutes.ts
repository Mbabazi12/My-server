import express, {Router} from 'express';
import userControllers from '../controllers/userControllers';
import { dataChecker } from '../middlewares/datachecker';

const router : Router = express.Router()

router.post('/create', dataChecker.inputIsEmpty, dataChecker.EmailExist, userControllers.signup);
router.post('/login', userControllers.UserLogin);
router.get('/get', userControllers.getAllUsers);
router.get('/:id', userControllers.getUser);
router.delete('/:id', userControllers.deleteUser);
router.patch('/:id', userControllers.updateUser);

export default router;

// import controllers from '../controllers/userControllers';
// import { isAuthenticated, isOwner} from '../middlewares/middlewares';

// export default (router: express.Router) => {
//     router.get('/users', isAuthenticated , controllers.getAllUsers);
//     router.delete('/users/:id', isAuthenticated, isOwner, controllers.deleteUser);
//     router.patch('/users/:id', isAuthenticated, isOwner, controllers.updateUser);
// };