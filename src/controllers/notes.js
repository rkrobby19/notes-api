const Note = require("../models");

class Notes {
  static addNoteHandler = async (req, res) => {
    const { tittle, body } = req.body;

    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const note = new Note({ tittle, body, createdAt, updatedAt });
    await note.save();
    res.status(201).send({ note });
  };

  static getAllNotesHandler = async (req, res) => {
    const notes = await Note.find();
    res.send({ notes });
  };

  static getNoteByIdHandler = async (req, res) => {
    const { id } = req.params;
    const note = await Note.findById(id);
    res.send({ note });
  };
}

module.exports = Notes;
