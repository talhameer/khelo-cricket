const express = require("express");
const db = require("../config/database");

const router = express.Router();

router.post("/createMatch", (req, res) => {
    const sql = `INSERT INTO matches (team1, team2, tournament_id, team1_runs, team2_runs, winner) VALUES ( ${req.body.team1}, ${req.body.team2}, ${req.body.tournament}, ${req.body.team1_runs}, ${req.body.team2_runs}, ${req.body.winner})`;

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.send(JSON.stringify(result));
    });
});

router.get("/getMatches", (req, res) => {
    const sql = `SELECT * FROM matches`;

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.json(result);
    });
});

router.get("", (req, res) => {});

router.put("", (req, res) => {});

router.delete("", (req, res) => {});

module.exports = router;
