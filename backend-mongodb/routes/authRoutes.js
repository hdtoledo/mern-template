import express from 'express';
import { login } from '../controllers/authController.js';
import { register } from '../controllers/registerController.js';
import { getAllUsers, deleteUser, updateUser } from '../controllers/adminController.js';

const router = express.Router();

// POST /api/auth/login
router.post('/login', login);
router.post('/register', register);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateUser);

export default router;