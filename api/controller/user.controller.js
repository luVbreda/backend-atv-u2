import { createUser } from '../services/user.service.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const register = async (req, res) => {
    console.log("Registering user:", req.body);
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    try {
        const savedUser = await createUser(username, email, password);
        console.log("Saved user:", savedUser);
        return res.status(201).json({ message: 'User registered successfully', user: savedUser });
    } catch (error) {
        console.error("Error saving user:", error);
        return res.status(500).json({ message: `Error saving user ${error.message}` });
    }
};

const login = async (req, res) => {
    console.log("Logging in user:", req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error("Error logging in user", error);
        return res.status(500).json({ message: `Error logging in user ${error.message}` });
    }
};

export default { register, login };