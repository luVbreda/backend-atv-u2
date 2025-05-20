import { createUser } from '../services/user.service.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// REGISTRO DE USUÁRIO
const register = async (req, res) => {
    console.log("Registering user:", req.body);
    const { username, email, password, name, bio } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    try {
        // Verifica unicidade de username e email
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(400).json({ message: 'Username already taken' });
            }
            if (existingUser.email === email) {
                return res.status(400).json({ message: 'Email already registered' });
            }
        }

        // Cria usuário
        const savedUser = await createUser(username, email, password, name, bio);
        console.log("Saved user:", savedUser);

        // Gera token JWT
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Retorna usuário sem senha
        const userToReturn = await User.findById(savedUser._id).select('-password');
        return res.status(201).json({ message: 'User registered successfully', user: userToReturn, token });
    } catch (error) {
        console.error("Error saving user:", error);
        return res.status(500).json({ message: `Error saving user ${error.message}` });
    }
};

// LOGIN DE USUÁRIO
const login = async (req, res) => {
    console.log("Logging in user:", req.body);
    const { email, username, password } = req.body;

    if ((!email && !username) || !password) {
        return res.status(400).json({ message: 'Email or username and password are required' });
    }

    try {
        // Permite login por email ou username
        const query = email ? { email } : { username };
        const user = await User.findOne(query).select('+password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Retorna usuário sem senha
        const userToReturn = await User.findById(user._id).select('-password');
        return res.status(200).json({ message: 'Login successful', token, user: userToReturn });
    } catch (error) {
        console.error("Error logging in user", error);
        return res.status(500).json({ message: `Error logging in user ${error.message}` });
    }
};

// PERFIL DO USUÁRIO
export const getUserProfile = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar perfil', error: error.message });
    }
};

// ATUALIZAÇÃO DE PERFIL
export const updateUserProfile = async (req, res) => {
    try {
        const { username } = req.params;
        const { name, bio } = req.body;
        let update = {};
        if (name) update.name = name;
        if (bio) update.bio = bio;

        // Se for upload de avatar, trate aqui (exemplo simplificado)
        if (req.file) {
            update.avatar = req.file.path; // ou outro campo conforme seu upload
        }

        const user = await User.findOneAndUpdate(
            { username },
            { $set: update },
            { new: true, runValidators: true }
        ).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar perfil', error: error.message });
    }
};

// (Opcional) ATUALIZAÇÃO DE CONFIGURAÇÕES
export const updateUserSettings = async (req, res) => {
    try {
        const { username } = req.params;
        const { theme } = req.body;
        let update = {};
        if (theme) update.theme = theme;

        const user = await User.findOneAndUpdate(
            { username },
            { $set: update },
            { new: true, runValidators: true }
        ).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar configurações', error: error.message });
    }
};

// Exporte as funções para uso nas rotas
export const registerUser = register;
export const loginUser = login;