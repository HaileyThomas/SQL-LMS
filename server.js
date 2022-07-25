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

// default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// listen for server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// db.query(`SELECT * FROM patrons`, (err, rows) => {
// console.log(rows);
// });

// GET a single patron
//db.query(`SELECT * FROM patrons WHERE id = 1`, (err, row) => {
//if (err) {
//console.log(err);
//}
//console.log(row);
//});

// DELETE a patron
//db.query(`DELETE FROM patrons WHERE id = ?`, 1, (err, result) => {
//if (err) {
//console.log(err);
//}
//console.log(result);
//});

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
