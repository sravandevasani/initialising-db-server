const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();

let dbPath = path.join(__dirname, "goodreads.db");
let db = null;

let initialiseDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () => {
      console.log("The server is running on http://localhost:3000");
    });
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
};
initialiseDBAndServer();

app.get("/books/", async (req, res) => {
  let getBooksQuery = `SELECT * FROM book ORDER BY book_id;`;

  let booksArray = await db.all(getBooksQuery);
  res.send(booksArray);
});
