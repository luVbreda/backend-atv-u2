import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  updateUserSettings
} from '../controller/user.controller.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:username', getUserProfile);
router.patch('/:username', updateUserProfile);
router.patch('/:username/settings', updateUserSettings); // se existir

export default router;