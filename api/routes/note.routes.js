const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note.controller');
const authMiddleware = require('../middlewares/auth.middleware'); // Middleware para verificar JWT

// Protege todas as rotas com o middleware de autenticação
router.use(authMiddleware);

// Rotas CRUD
router.post('/', noteController.createNote); // Criar uma nova nota
router.get('/', noteController.getAllNotes); // Listar todas as notas do usuário
router.get('/:id', noteController.getNoteById); // Obter detalhes de uma nota
router.put('/:id', noteController.updateNote); // Atualizar todos os dados de uma nota
router.patch('/:id', noteController.partialUpdateNote); // Atualizar parcialmente uma nota
router.delete('/:id', noteController.deleteNote); // Deletar uma nota

module.exports = router;