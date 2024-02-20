import express, { Router } from 'express';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/controllers';

import Controller from '../controllers/controllers';

const router: Router = express.Router();

router.get('/', Controller.getUsers);
router.get('/:id', Controller.getUser);
router.post('/', Controller.createUser);
router.put('/:id', Controller.updateUser);
router.delete('/:id', Controller.deleteUser);

export default router;
