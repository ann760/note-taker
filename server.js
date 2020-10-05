const express = require("express");
const app = express();
const PORT = process.env.PORT || 3002;

// sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static("public"));
const fs = require("fs");
const path = require("path");

// data
const { db } = require("./db/db.json");

//functions
// write new note to the db.json
function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify({ db: notesArray }, null, 2)
  );
  return note;
}

//---ROUTES---
//get route
app.get("/api/notes", (req, res) => {
  res.json(db);
});

// post route
app.post("/api/notes", (req, res) => {
  // set an id
  req.body.id = db.length.toString();
  
    const note = createNewNote(req.body, db);
    res.json(note);
});

// listener
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
