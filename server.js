const { randomUUID } = require("crypto");
const express = require("express"); // (BOILERPLATE)
const path = require("path");
const fs = require("fs"); // required to read and write files

const PORT = 3001; // (BOILERPLATE)

const app = express(); // (BOILERPLATE)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serves all static files from public folder
app.use(express.static(path.join(__dirname, "public")));

// GET /notes should return the notes.html file.
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// GET * should return the index.html file.
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "db", "db.json"));
});

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      note_id: randomUUID(),
    };

    fs.readFile(path.join(__dirname, "db", "db.json"), "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }

      const notes = JSON.parse(data || "[]");

      notes.push(newNote);

      // Note has been written to JSON file
      fs.writeFile(
        path.join(__dirname, "db", "db.json"),
        JSON.stringify(notes),
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(
              `Note for ${newNote.title} has been written to JSON file`
            );
          }
        }
      );
    });
  }
});

app.listen(
  PORT,
  () => console.log(`Express server listening on port ${PORT}!`) // (BOILERPLATE)
);
