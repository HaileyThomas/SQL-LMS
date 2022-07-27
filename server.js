const express = require("express");
const mysql = require("mysql2");

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

// CREATE a patron
//const sql = `INSERT INTO patrons (id, first_name, last_name, address)
//            VALUES (?, ?, ?, ?)`;
//const params = [1, "Hailey", "Thomas", "408 Citrus Trail"];

//db.query(sql, params, (err, result) => {
//if (err) {
//console.log(err);
//}
//console.log(result);
//});

// default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});
