const express = require("express");
const db = require("../config/database");

const router = express.Router();

router.post("/createTeam", (req, res) => {
    let query = "SELECT MAX(`id`) as id FROM `teams`";

    db.query(query, (err, result) => {
        if (err) throw err;
        result = JSON.parse(JSON.stringify(result));

        query =
            "INSERT INTO `teams` (`id`, `name`, `logo`, `coach`, `sponsor`) VALUES ('" +
            (result[0].id + 1) +
            "', '" +
            req.body.name +
            "', NULL, '" +
            req.body.coach +
            "', '" +
            req.body.sponsor +
            "')";

        db.query(query, (err, result) => {
            if (err) throw err;
            res.send(JSON.stringify(result));
        });
    });
});

router.get("/getTeams", (req, res) => {
    const sql = "SELECT * FROM `teams`";

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.send(JSON.stringify(result));
    });
});

router.get("/getTeam/:id", (req, res) => {
    const sql = `SELECT * FROM teams where id = ${req.params.id}`;

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.send(JSON.stringify(result));
    });
});

router.put("/updateTeam/:id", (req, res) => {
    const sql = `UPDATE teams SET name = '${req.body.name}', logo = '${req.body.logo}', coach = '${req.body.coach}', sponsor = '${req.body.sponsor}' WHERE id = ${req.params.id}`;
    console.log(sql);

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(JSON.stringify(result));
    });
});

router.delete("/deleteTeam/:id", (req, res) => {
    const sql = `DELETE FROM teams WHERE id = ${req.params.id}`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(JSON.stringify(result));
    });
});

module.exports = router;
