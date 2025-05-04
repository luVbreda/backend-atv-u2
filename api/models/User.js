import moongose from 'mongoose';

const userSchema = new moongose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
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
})

const User = moongose.model('User', userSchema);
export default User;