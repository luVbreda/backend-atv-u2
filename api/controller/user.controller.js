import { createUser } from '../services/user.service.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const register = async (req, res) => {
    console.log("Registering user:", req.body);
    if (!req.body || !req.body.username || !req.body.password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const { username, password } = req.body;

    try {
        const savedUser = await createUser(username, password);
        console.log("Saved user:", savedUser);
        return res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Error saving user:", error);
        return res.status(500).json({ message: `Error saving user ${error}` });
    }
};

const login = async (req, res) => {
    console.log("Logging in user:", req.body);

    if (!req.body || !req.body.username || !req.body.password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username }).select('+password');
        if(!user) {
            console.log("User not found:", username);
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", isMatch);
        if(!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        console.log("User logged in successfully:", user.username);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: 'User logged in successfully', token});
    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({ message: `Error logging in user ${error}` });
    }
};


export default { register, login };