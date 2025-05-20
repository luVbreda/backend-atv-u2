import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9_]{3,15}$/, 'Username inválido!']
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    }
});

const User = mongoose.model('User', userSchema);
export default User;