const express = require("express"); // (BOILERPLATE)
const path = require("path");

const PORT = 3001; // (BOILERPLATE)

const app = express(); // (BOILERPLATE)

// GET /notes should return the notes.html file.
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "notes.html"));
});

// GET * should return the index.html file.
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// GET /api/notes should read the db.json file and return all saved notes as JSON.

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

app.listen(
  PORT,
  () => console.log(`Express server listening on port ${PORT}!`) // (BOILERPLATE)
);
