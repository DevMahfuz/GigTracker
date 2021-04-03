const express = require("express");
const app = express();
var cors = require("cors");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

app.get("/maketable", (req, res) => {
  let db = new sqlite3.Database(
    "./data/data.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Connected to the database.");
    }
  );
  db.serialize(() => {
    db.run(
      `ALTER TABLE projects
      ADD COLUMN work_time TEXT`,
      [],
      (err, rows) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.status(200).json({
          message: "success",
        });
      }
    );
  });

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Close the connection.");
  });
});

app.listen(6000, () => console.log("Gator app listening on port 6000!"));
