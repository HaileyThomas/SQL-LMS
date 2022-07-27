const express = require("express");
const mysql = require("mysql2");
const inputCheck = require("./utils/inputCheck");

const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "root",
    database: "library",
  },
  console.log("Connected to the library database.")
);

// listen for server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// GET all patrons
app.get("/api/patrons", (req, res) => {
  const sql = `SELECT * FROM patrons`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// GET a single patron
app.get("/api/patrons/:id", (req, res) => {
  const sql = `SELECT * FROM patrons WHERE id= ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

// DELETE a patron
app.delete("/api/patrons/:id", (req, res) => {
  const sql = `DELETE FROM patrons WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "Patron not found!",
      });
    } else {
      res.json({
        message: "deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

// POST (create) a new patron
app.post("/api/patrons", ({ body }, res) => {
  const errors = inputCheck(body, "first_name", "last_name", "address");
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO patrons (first_name, last_name, address)
                VALUES (?, ?, ?)`;
  const params = [body.first_name, body.last_name, body.address];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "Created new patron!",
      data: body,
    });
  });
});

// default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});
