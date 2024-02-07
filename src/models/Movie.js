const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [5, "Title should be at least 5 characters long"],
        match: [/^[\w\s]+$/, 'Title can only contain English letters and numbers.']
    },
    genre: {
        type: String,
        required: true,
        minLength: [5, "Genre should be at least 5 characters long"],
        match: [/^[\w\s]+$/, 'Genre can only contain English letters and numbers.']
    },
    director: {
        type: String,
        required: true,
        minLength: [5, "Director should be at least 5 characters long"],
        match: [/^[\w\s]+$/, 'Director can only contain English letters and numbers.']
    },
    year: {
        type: Number,
        required: true,
        min: 1900,
        max: 2024
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    description: {
        type: String,
        required: true,
        minLength: [20, "Description should be at least 20 characters long"],
        match: [/^[\w\s]+$/, 'Description can only contain English letters and numbers.'],
    },
    imageUrl: {
        type: String,
        require: true,
        match: [/^https?:\/\/\w+/mg, 'Please enter valid URL.'],
    },
    casts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Cast'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;