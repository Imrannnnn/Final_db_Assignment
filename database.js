const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// database file (stored locally in project folder)
const db_name = path.join(__dirname, "data.sqlite");

// open database connection
const db = new sqlite3.Database(db_name, (err) => {
  if (err) {
    console.error("Error opening database: " + err.message);
  } else {
    console.log("Database connected.");

    // Create tables if they don't exist
    db.run(
      `CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT
      )`
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE,
        course_id INTEGER,
        FOREIGN KEY (course_id) REFERENCES courses(id)
      )`
    );
  }
});

module.exports = db;
