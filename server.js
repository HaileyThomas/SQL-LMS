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