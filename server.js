const express = require("express");
const PORT = process.env.PORT || 3002;
const app = express();

const { db } = require("./db/db.json");

function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, "./develop/db.json"),
    JSON.stringify({ db: notesArray }, null, 2)
  );
  return note;
}

function validateNote(note) {
  if (!note.title || typeof note.title !== "string") {
    return false;
  }
  if (!note.text || typeof note.test !== "string") {
    return false;
  }
  return true;
}

app.get("/", (req, res) => {
    res.json(db);
  });

app.post("/api/db", (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = note.length.toString();

  // if any data in req.body is incorrect, send 400 error back
  if (!validateNote(req.body)) {
    res.status(400).send("The notes is not properly formatted.");
  } else {
    const note = createNewNote(req.body, note);
    res.json(note);
  }
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
