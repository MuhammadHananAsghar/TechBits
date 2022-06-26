const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    article: {
        type: String,
        required: true
    },
    copyright: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});


const articles = new mongoose.model("articles", articleSchema);
module.exports = articles;