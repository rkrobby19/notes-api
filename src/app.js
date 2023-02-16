require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const notesRouter = require("./routes");

const uri = process.env.MONGO_URI;
mongoose.connect(uri).then(
  () => {
    console.log("Connected to mongoDB");
  },
  (err) => {
    console.error(err);
  }
);

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  next();
});

app.use("/api", notesRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}/`);
});
