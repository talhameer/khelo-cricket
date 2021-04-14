const express = require("express");

const db = require("./config/database");

const path = require("path");
const fs = require("fs");

const players = require("./api/players");
const teams = require("./api/teams");

const app = express();

app.use(express.json());

app.use("/api/", players);
app.use("/api/", teams);

app.get("/createDB", (req, res) => {
    let sql = "CREATE DATABASE test_DB";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("database created");
    });

    sql = fs
        .readFileSync(path.join(__dirname, "/sql/cricket_club.sql"))
        .toString();
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("query executed.");
    });
});

app.listen(3000, () => console.log("Running at port 3000"));
