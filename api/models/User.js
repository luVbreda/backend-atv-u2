import moongose from 'mongoose';

const userSchema = new moongose.Schema({
    username: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    }
})

const User = moongose.model('User', userSchema);
export default User;