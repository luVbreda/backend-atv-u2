import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export const createUser = async (username, email, password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const savedUser = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    return savedUser;
};