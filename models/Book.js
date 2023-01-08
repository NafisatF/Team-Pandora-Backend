const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title:{
        type: String, 
        required: true
    },
    author:{
        type: String, 
        required: true
    },
    referencenumber:{
        type: String, 
        required: true
    },
    format:{
        type: String, 
        required: true
    },
    language:{
        type: String, 
        required: true
    },
    isbn3:{
        type: String, 
        required: true
    },
    releasedate:{
        type: Date, 
        required: true
    },
    publisher:{
        type: String, 
        required: true
    },
    weight:{
        type: String, 
        required: true
    },
    imageUrl: {
        type: String, 
        required: true
    },
    downloadurl:{
        type: String, 
        required: true
    },
    category:{
        type: String, 
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Book', bookSchema)