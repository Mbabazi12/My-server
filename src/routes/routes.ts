import express, { Router } from 'express';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/controllers';

import Controller from '../controllers/controllers';

const router: Router = express.Router();

router.get('/users', Controller.getUsers);
router.get('/users/:id', Controller.getUser);
router.post('/users', Controller.createUser);
router.put('/users/:id', Controller.updateUser);
router.delete('/users/:id', Controller.deleteUser);

export default router;
