const Note = require('../models/note.model');

// Criar uma nova nota
exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id; // Obtém o ID do usuário autenticado

    const note = await Note.create({ title, content, userId });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar nota', error: error.message });
  }
};

// Listar todas as notas do usuário autenticado
exports.getAllNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const notes = await Note.find({ userId });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar notas', error: error.message });
  }
};

// Obter detalhes de uma nota
exports.getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const note = await Note.findOne({ _id: id, userId });
    if (!note) {
      return res.status(404).json({ message: 'Nota não encontrada' });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar nota', error: error.message });
  }
};

// Atualizar todos os dados de uma nota
exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user.id;

    const note = await Note.findOneAndUpdate(
      { _id: id, userId },
      { title, content },
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({ message: 'Nota não encontrada' });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar nota', error: error.message });
  }
};

// Atualizar parcialmente uma nota
exports.partialUpdateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const note = await Note.findOneAndUpdate(
      { _id: id, userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({ message: 'Nota não encontrada' });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar nota', error: error.message });
  }
};

// Deletar uma nota
exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const note = await Note.findOneAndDelete({ _id: id, userId });
    if (!note) {
      return res.status(404).json({ message: 'Nota não encontrada' });
    }

    res.status(200).json({ message: 'Nota deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar nota', error: error.message });
  }
};