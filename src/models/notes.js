const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema({
  tittle: String,
  body: String,
  createdAt: Date,
  updatedAt: Date,
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
