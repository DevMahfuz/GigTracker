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

//Route to serve Start Time
app.get("/start-time", (req, res) => {
  let db = new sqlite3.Database(
    "./data/data.db",
    sqlite3.OPEN_READONLY,
    (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Connected to the database.");
    }
  );
  db.serialize(() => {
    db.all("SELECT * FROM count_start", (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(200).json({
        message: "success",
        projects: rows,
      });
    });
  });

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Close the connection.");
  });
});

//Route to serve End Time
app.get("/end-time", (req, res) => {
  let db = new sqlite3.Database(
    "./data/data.db",
    sqlite3.OPEN_READONLY,
    (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Connected to the database.");
    }
  );
  db.serialize(() => {
    db.all("SELECT * FROM count_end", (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(200).json({
        message: "success",
        projects: rows,
      });
    });
  });

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Close the connection.");
  });
});

//Route to serve Project
app.get("/", (req, res) => {
  let db = new sqlite3.Database(
    "./data/data.db",
    sqlite3.OPEN_READONLY,
    (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Connected to the database.");
    }
  );
  db.serialize(() => {
    db.all("SELECT * FROM projects", (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(200).json({
        message: "success",
        projects: rows,
      });
    });
  });

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Close the connection.");
  });
});

//Route to Create New Project
app.post("/create", (req, res) => {
  let pName = req.body.name;
  let cName = req.body.c_name;
  let pRate = req.body.rate;
  let description = req.body.description;
  let sDate = req.body.start_date;
  let eDate = req.body.end_date;
  let note = req.body.note;

  console.log(pName, cName, pRate, description, sDate, eDate, note);

  let db = new sqlite3.Database(
    "./data/data.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      console.log("Connected to the chinook database.");
    }
  );
  db.serialize(() => {
    db.run(
      `INSERT INTO projects(name, rate, start_date, end_date, description, c_name, note ) VALUES(?,?,?,?,?,?,?)`,
      [pName, pRate, sDate, eDate, description, cName, note],
      function (err) {
        if (err) {
          res.status(400).json({ massage: err.message });
          return;
        }
        // get the last insert id
        res.json({
          massage: `A Projrct has created with id ${this.lastID}`,
        });
      }
    );
  });

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Close the database connection.");
  });
});

//Route to Update Project
app.put("/update/:id", (req, res) => {
  let pId = req.params.id;
  let pName = req.body.name;
  let cName = req.body.c_name;
  let pRate = req.body.rate;
  let description = req.body.description;
  let sDate = req.body.start_date;
  let eDate = req.body.end_date;
  let note = req.body.note;

  console.log(pId, pName, cName, pRate, description, sDate, eDate, note);

  let sql = `UPDATE projects 
  SET name = ?, 
  rate = ?, 
  start_date = ?, 
  end_date = ?, 
  description = ?, 
  c_name = ?, 
  note = ? 
  WHERE id = ?`;

  let db = new sqlite3.Database(
    "./data/data.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      console.log("Connected to the database.");
    }
  );
  db.serialize(() => {
    db.run(
      sql,
      [pName, pRate, sDate, eDate, description, cName, note, pId],
      function (err) {
        if (err) {
          res.status(400).json({ massage: err.message });
          return;
        }
        // get the last insert id
        res.json({
          massage: `UpdateProject ${pName}`,
        });
      }
    );
  });

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Close the database connection.");
  });
});

//Route to Update Project Status
app.put("/updatestatus/:id", (req, res) => {
  let pId = req.params.id;
  let satus = req.body.status;

  let sql = `UPDATE projects 
  SET status = ?
  WHERE id = ?`;

  let db = new sqlite3.Database(
    "./data/data.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      console.log("Connected to the database.");
    }
  );
  db.serialize(() => {
    db.run(sql, [satus, pId], function (err) {
      if (err) {
        res.status(400).json({ massage: err.message });
        return;
      }
      // get the last insert id
      res.json({
        massage: `Project ${pId}'s Status update to ${satus}`,
      });
    });
  });

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Close the database connection.");
  });
});

//Route to Update Project Last_Start Time
app.put("/update-start-time/:id", (req, res) => {
  let pId = req.params.id;
  let startTime = req.body.lastStartTime;

  let sql = `UPDATE projects 
  SET last_start = ?
  WHERE id = ?`;

  let db = new sqlite3.Database(
    "./data/data.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      console.log("Connected to the database.");
    }
  );
  db.serialize(() => {
    db.run(sql, [startTime, pId], function (err) {
      if (err) {
        res.status(400).json({ massage: err.message });
        return;
      }
      // get the last insert id
      res.json({
        massage: `Project ${pId}'s Status update to ${startTime}`,
      });
    });
  });

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Close the database connection.");
  });
});

//Route to Update Project Last_End Time
app.put("/update-end-time/:id", (req, res) => {
  let pId = req.params.id;
  let endTime = req.body.lastEndTime;

  let sql = `UPDATE projects 
  SET last_end = ?
  WHERE id = ?`;

  let db = new sqlite3.Database(
    "./data/data.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      console.log("Connected to the database.");
    }
  );
  db.serialize(() => {
    db.run(sql, [endTime, pId], function (err) {
      if (err) {
        res.status(400).json({ massage: err.message });
        return;
      }
      // get the last insert id
      res.json({
        massage: `Project ${pId}'s Status update to ${endTime}`,
      });
    });
  });

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Close the database connection.");
  });
});

//Route to Update Project Time
app.put("/updatetime/:id", (req, res) => {
  let pId = req.params.id;
  let wTime = req.body.workTime;

  let sql = `UPDATE projects 
  SET work_time = ?
  WHERE id = ?`;

  let db = new sqlite3.Database(
    "./data/data.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      console.log("Connected to the database.");
    }
  );
  db.serialize(() => {
    db.run(sql, [wTime, pId], function (err) {
      if (err) {
        res.status(400).json({ massage: err.message });
        return;
      }
      // get the last insert id
      res.json({
        massage: `Project ${pId}'s Time updated`,
      });
    });
  });

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Close the database connection.");
  });
});

//Route to serve Single Project
app.get("/:id", (req, res) => {
  let id = req.params.id;

  let db = new sqlite3.Database(
    "./data/data.db",
    sqlite3.OPEN_READONLY,
    (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Connected to the database.");
    }
  );

  db.serialize(() => {
    db.get("SELECT * FROM projects WHERE id  = ?", [id], (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(200).json({
        message: "success",
        project: row,
      });
    });
  });

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Close the database connection.");
  });
});

//Route For Delect Project
app.delete("/delete/:id", (req, res) => {
  let id = req.params.id;

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
    db.run(`DELETE FROM projects WHERE id =?`, id, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      console.log(`Project ${id} has been delet`);
    });

    db.run(`DELETE FROM count_start WHERE p_id =?`, id, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      console.log(`Project ${id} log has been delet `);
    });

    db.run(`DELETE FROM count_ent WHERE p_id =?`, id, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(200).json({
        message: "success",
        project: row,
      });
    });
  });

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Close the database connection.");
  });
});

//Route For Post Start time
app.post("/countstart/:id", (req, res) => {
  let pId = req.params.id;
  let startTime = req.body.startTime;

  let db = new sqlite3.Database(
    "./data/data.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      console.log("Connected to the database.");
      console.log(pId, startTime);
    }
  );

  db.serialize(() => {
    db.run(
      `INSERT INTO count_start (p_id, start_time) VALUES(?,?)`,
      [pId, startTime],
      function (err) {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        // get the last insert id
        res.status(200).json({
          massage: `A row has been inserted with rowid ${this.lastID}`,
        });
      }
    );
  });

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Close the database connection.");
  });
});

//Route For Post Ent time
app.post("/countend/:id", (req, res) => {
  let pId = req.params.id;
  let endTime = req.body.endTime;

  let db = new sqlite3.Database(
    "./data/data.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      console.log("Connected to the database.");
    }
  );

  db.serialize(() => {
    db.run(
      `INSERT INTO count_end (p_id, end_time) VALUES(?,?)`,
      [pId, endTime],
      function (err) {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        // get the last insert id
        res.status(200).json({
          massage: `A row has been inserted with rowid ${this.lastID}`,
        });
      }
    );
  });

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Close the database connection.");
  });
});

app.listen(5000, () => console.log("Gator app listening on port 5000!"));
