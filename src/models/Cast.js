
const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name'],
        minLength: [5, "Name should be at least 5 characters long"],
        match: [/^[\w\s]+$/, 'Name can only contain English letters and numbers.']
    },
    age: {
        type: Number,
        required: [true, 'Please enter age'],
        min: [1, "Age must be between 1 and 120"],
        max: [120,'Age must be between 1 and 120'],
    },
    born: {
        type: String,
        required: [true, 'Please enter born'],
        minLength: [10, "Born should be at least 10 characters long"],
        match: [/^[\w\s]+$/, 'Born can only contain English letters and numbers.']
    },
    nameInMovie: {
        type: String,
        required: [true, 'Please enter character'],
        minLength: [5, "Character should be at least 5 characters long"],
        match: [/^[\w\s]+$/, 'Character can only contain English letters and numbers.']
    },
    castImage: {
        type: String,
        match: [/^https?:\/\/\w+/mg, 'Please enter valid URL']
    },
});

const Cast = mongoose.model('Cast', castSchema);

module.exports = Cast