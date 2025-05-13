import express from 'express';
import {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  partialUpdateNote,
  deleteNote,
} from '../controller/note.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

// Aplica o middleware de autenticação em todas as rotas
router.use(authMiddleware);

// Rotas CRUD
router.post('/', createNote); // Criar uma nova nota
router.get('/', getAllNotes); // Listar todas as notas do usuário
router.get('/:id', getNoteById); // Obter detalhes de uma nota
router.put('/:id', updateNote); // Atualizar todos os dados de uma nota
router.patch('/:id', partialUpdateNote); // Atualizar parcialmente uma nota
router.delete('/:id', deleteNote); // Deletar uma nota

export default router; // Exporta o roteador como padrão