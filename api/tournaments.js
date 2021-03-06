const express = require("express");
const db = require("../config/database");

const router = express.Router();

router.post("/createTournament", (req, res) => {
    const sql = `INSERT INTO tournaments(
                    NAME,
                    venue,
                    start_date,
                    end_date
                )
                VALUES(
                    '${req.body.name}',
                    '${req.body.venue}',
                    '${req.body.start_date}',
                    '${req.body.end_date}'
                )`;

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.json(result);
    });
});

router.post("/setTournamentWinner/:id", (req, res) => {
    const sql = `UPDATE tournaments SET winner = ${req.body.winner} WHERE id = ${req.params.id};`;

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.json(result);
    });
});

router.get("/getTournaments", (req, res) => {
    const sql = `SELECT * FROM tournaments`;

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.json(result);
    });
});

router.get("/getTournament/:id", (req, res) => {
    const sql = `SELECT * FROM tournaments where id = ${req.params.id}`;

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.json(result);
    });
});

router.get("/getTournamentPoints/:id", (req, res) => {
    const sql = `SELECT
                    teams.name,
                    (SELECT COUNT(*) FROM matches WHERE (team1 = teams.id OR team2 = teams.id) AND tournament_id = ${req.params.id}) AS matches_played,
                    COUNT(*) AS win,
                    ((SELECT COUNT(*) FROM matches WHERE (team1 = teams.id OR team2 = teams.id) AND tournament_id = ${req.params.id}) - COUNT(*)) AS loss,
                    (COUNT(*) * 2) AS points
                FROM
                    matches
                JOIN teams ON matches.winner = teams.id
                WHERE
                    tournament_id = ${req.params.id}
                GROUP BY
                    teams.name`;

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.json(result);
    });
});

router.put("/updateTournament/:id", (req, res) => {
    const sql = `UPDATE
                    tournaments
                SET NAME
                    = '${req.body.name}',
                    venue = '${req.body.venue}',
                    start_date = '${req.body.start_date}',
                    end_date = '${req.body.end_date}',
                    winner = ${req.body.winner}
                WHERE
                    id = ${req.params.id}`;

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.json(result);
    });
});

router.delete("/deleteTournament/:id", (req, res) => {
    const sql = `DELETE FROM tournaments WHERE id = ${req.params.id}`;

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.json(result);
    });
});

module.exports = router;
