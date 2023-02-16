const express = require("express");
const Notes = require("../controllers");
const router = express.Router();

router
  .post("/notes", Notes.addNoteHandler)
  .get("/notes", Notes.getAllNotesHandler);

router.get("/notes/:id", Notes.getNoteByIdHandler);

module.exports = router;
