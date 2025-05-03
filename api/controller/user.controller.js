import { createUser } from '../services/user.service.js';

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

export default { register };