const mongoose = require('mongoose');
const { Schema } = mongoose;
const NotesSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
    },
    tag: {
        type: String,
        default: 'General'

    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('notes', NotesSchema)