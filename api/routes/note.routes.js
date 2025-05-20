import express from 'express';
import {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  partialUpdateNote,
  deleteNote,
} from '../controller/note.controller.js';
import verifyToken from '../middleware/jwt.token.middleware.js';

const router = express.Router();

router.use(verifyToken);

router.post('/', createNote);
router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.put('/:id', updateNote);
router.patch('/:id', partialUpdateNote);
router.delete('/:id', deleteNote);

export default router;