import express, {Router} from 'express';
import controllers from '../controllers/userControllers';
import { dataChecker } from '../middlewares/datachecker';

const router : Router = express.Router()

router.post('/', dataChecker.inputIsEmpty, dataChecker.EmailExist, controllers.createUser);
router.post('/login', controllers.login);
router.get('/', controllers.getAllUsers);
router.get('/:id', controllers.getUser);
router.delete('/:id', controllers.deleteUser);
router.delete('/', controllers.deleteAllUser);
router.patch('/:id', controllers.updateUser);

export default router;

// import controllers from '../controllers/userControllers';
// import { isAuthenticated, isOwner} from '../middlewares/middlewares';

// export default (router: express.Router) => {
//     router.get('/users', isAuthenticated , controllers.getAllUsers);
//     router.delete('/users/:id', isAuthenticated, isOwner, controllers.deleteUser);
//     router.patch('/users/:id', isAuthenticated, isOwner, controllers.updateUser);
// };