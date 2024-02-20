import express, { Router } from 'express';
import controllers from '../controllers/userControllers';


const router: Router = express.Router();

router.post('/', controllers.createUser);
router.get('/', controllers.getAllUser);
router.get('/:id', controllers.getUser);
router.put('/:id', controllers.updateUser);
router.delete('/:id', controllers.deleteUser);
router.delete('/', controllers.deleteAllUser);

export default router;
