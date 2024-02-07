const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        unique: true,
        match: [/^\w+@\w+\.\w+$/,'enter valid email'],
        minLength: [10, 'email must be at least 10 characters long']
    },
    password: {
        type: String,
        require: [true, 'Password is required'],
        minLength: [6, 'Password must be at least 6 characters long']
    }
})

userSchema.virtual('rePass')
    .set(function(value) {
        if (value !== this.password) {
            throw new Error('Password missmatch!');
        }
    });


userSchema.pre('save', async function() {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
})

const User = mongoose.model('User', userSchema);

module.exports = User;