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
    let notes = await Note.find();
    const { tittle } = req.query;

    notes = notes.map((note) => ({
      tittle: note.tittle,
      note: note.body,
    }));

    res.send({ notes });
  };

  static getNoteByIdHandler = async (req, res) => {
    const { id } = req.params;
    const note = await Note.findById(id);
    res.send({ note });
  };

  static updateNoteByIdHandler = async (req, res) => {
    const { id } = req.params;
    const { tittle, body } = req.body;

    const updatedAt = new Date().toISOString();

    const data = { tittle, body, updatedAt };

    const note = await Note.findByIdAndUpdate(id, data);
    res.send({ note });
  };

  static deleteNoteByIdHandler = async (req, res) => {
    const { id } = req.params;

    const note = await Note.findByIdAndRemove(id);
    res.send({ note });
  };
}

module.exports = Notes;
