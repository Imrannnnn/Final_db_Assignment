# Simple CRUD API with Node.js, Express & SQLite

 Hello, I’m **Nasiru Murana**.  
This is a **beginner-friendly CRUD project** I built to practice **backend development** using **Node.js, Express, and SQLite**.

The app manages two entities:
- **Courses**
- **Students** (each student can be linked to a course)

It’s designed to be **as simple as possible**, so anyone can clone, run, and understand how CRUD works.

---

##  Features
- Create, Read, Update, Delete **Courses**
- Create, Read, Update, Delete **Students**
- Lightweight SQLite database (stored as a file, no setup required)
- Testable via **Postman** or **curl**

---

##  How the Code Works

This project has **two main files** you need to know about:

### 1. `database.js`
- This file sets up the **SQLite database**.
- It creates two tables:
  - `courses` (for storing course name & description)
  - `students` (for storing student info and linking them to a course using `course_id`)
- If the database file doesn’t exist yet, it’s automatically created when you run the app.

Think of it as the "data storage" layer.

---

### 2. `server.js`
- This is the **main server file**.
- It uses **Express** (a Node.js web framework) to create HTTP routes.
- Each route corresponds to one CRUD operation:
  - `GET` → read data
  - `POST` → create new data
  - `PUT` → update data
  - `DELETE` → remove data
- Example:
  - `app.post('/courses', ...)` → whenever you send a `POST` request to `/courses`, a new course is added to the database.

Think of it as the "traffic manager" that receives requests, talks to the database, and sends responses back.

---

### 3. How CRUD Flows
When you hit an endpoint:
1. **Request comes in** → e.g., `POST /students`
2. Express matches it to the correct route → `app.post('/students')`
3. The route runs an **SQL query** on the database (using `db.run`, `db.get`, or `db.all`)
4. The result (success or error) is sent back as a **JSON response**

---

### 4. Database File
- SQLite stores data in a single file called `data.sqlite`.
- You’ll see this file appear automatically once you start the server and add data.
- You can even open this file with tools like [DB Browser for SQLite](https://sqlitebrowser.org/) to visually inspect your database.

---

With these pieces:
- `database.js` = the "brain" that stores data  
- `server.js` = the "mouth and ears" that talk to clients  
Together, they form a complete CRUD API.
