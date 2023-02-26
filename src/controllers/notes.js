const Note = require("../models");

class Notes {
  static addNoteHandler = async (req, res) => {
    try {
      const { tittle, body } = req.body;

      const createdAt = new Date().toISOString();
      const updatedAt = createdAt;

      const note = new Note({ tittle, body, createdAt, updatedAt });
      await note.save();
      res.status(201).send({
        status: "Success",
        message: "Note successfully added",
        data: { id: note._id },
      });
    } catch (error) {
      res.send({ status: error.status, message: error.message });
    }
  };

  static getAllNotesHandler = async (req, res) => {
    try {
      let notes = await Note.find();

      notes = notes.map((note) => ({
        id: note._id,
        tittle: note.tittle,
        note: note.body,
      }));

      res.status(200).send({ status: "Success", data: notes });
    } catch (error) {
      res.send({ status: error.status, message: error.message });
    }
  };

  static getNoteByIdHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const note = await Note.findById(id);
      if (note === null) {
        return res.status(404).send({
          status: "Failed",
          message: "Catatan tidak ditemukan",
        });
      }
      return res.send({ status: "Success", data: note });
    } catch (error) {
      res.send({ status: error.status, message: error.message });
    }
  };

  static updateNoteByIdHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const { tittle, body } = req.body;

      const updatedAt = new Date().toISOString();

      const data = { tittle, body, updatedAt };

      const note = await Note.findByIdAndUpdate(id, data);

      if (note === null) {
        return res.status(404).send({
          status: "Failed",
          message: "Catatan tidak ditemukan",
        });
      }
      return res.send({
        status: "Success",
        message: "Catatan berhasil diperbarui",
      });
    } catch (error) {
      res.send({ status: error.status, message: error.message });
    }
  };

  static deleteNoteByIdHandler = async (req, res) => {
    try {
      const { id } = req.params;

      const note = await Note.findByIdAndRemove(id);
      if (note === null) {
        return res.status(404).send({
          status: "Failed",
          message: "Catatan tidak ditemukan",
        });
      }
      return res.send({
        status: "Success",
        message: "Catatan berhasil dihapus",
      });
    } catch (error) {
      res.send({ status: error.status, message: error.message });
    }
  };
}

module.exports = Notes;
