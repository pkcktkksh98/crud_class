const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: String,
    content: String,
})

export const Note = mongoose.models.Note || mongoose.model("Note",noteSchema)