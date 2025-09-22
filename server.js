const express = require("express");
const db = require("./database"); // import database
const app = express();

app.use(express.json());

// TESTING ROUTE
app.get("/", (req, res) => {
  res.send("Hello, CRUD app is working!");
});

// --- COURSES CRUD ---

// Read all courses
app.get("/courses", (req, res) => {
  db.all("SELECT * FROM courses", [], (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows);
  });
});

// Create new course
app.post("/courses", (req, res) => {
  const { name, description } = req.body;
  db.run(
    "INSERT INTO courses (name, description) VALUES (?, ?)",
    [name, description],
    function (err) {
      if (err) res.status(500).json({ error: err.message });
      else res.status(201).json({ id: this.lastID, name, description });
    }
  );
});

//STUDENTS CRUD 

// Read all students
app.get("/students", (req, res) => {
  db.all("SELECT * FROM students", [], (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows);
  });
});

// Create new student
app.post("/students", (req, res) => {
  const { name, email, course_id } = req.body;
  db.run(
    "INSERT INTO students (name, email, course_id) VALUES (?, ?, ?)",
    [name, email, course_id],
    function (err) {
      if (err) res.status(500).json({ error: err.message });
      else res.status(201).json({ id: this.lastID, name, email, course_id });
    }
  );
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


// Update a course (PUT)
app.put("/courses/:id", (req, res) => {
  const { name, description } = req.body;
  db.run(
    "UPDATE courses SET name = ?, description = ? WHERE id = ?",
    [name, description, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: "Course not found" });
      res.json({ id: Number(req.params.id), name, description });
    }
  );
});

// Delete a course (DELETE)
app.delete("/courses/:id", (req, res) => {
  db.run("DELETE FROM courses WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Course not found" });
    res.json({ deletedId: Number(req.params.id) });
  });
});


// Update a student (PUT)
app.put("/students/:id", (req, res) => {
  const { name, email, course_id } = req.body;
  db.run(
    "UPDATE students SET name = ?, email = ?, course_id = ? WHERE id = ?",
    [name, email, course_id, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: "Student not found" });
      res.json({ id: Number(req.params.id), name, email, course_id });
    }
  );
});

// Update a student (PUT)
app.put("/students/:id", (req, res) => {
  const { name, email, course_id } = req.body;
  db.run(
    "UPDATE students SET name = ?, email = ?, course_id = ? WHERE id = ?",
    [name, email, course_id, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: "Student not found" });
      res.json({ id: Number(req.params.id), name, email, course_id });
    }
  );
});

// Delete a student (DELETE)
app.delete("/students/:id", (req, res) => {
  db.run("DELETE FROM students WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Student not found" });
    res.json({ deletedId: Number(req.params.id) });
  });
});
