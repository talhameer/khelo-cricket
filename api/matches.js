const express = require("express");
const db = require("../config/database");

const router = express.Router();

router.post("/createMatch", (req, res) => {
    const sql = `INSERT INTO matches(
                    match_type,
                    team1,
                    team2,
                    DATE,
                    TIME,
                    tournament_id
                )
                VALUES(
                    ${req.body.match_type},
                    ${req.body.team1},
                    ${req.body.team2},
                    '${req.body.date}',
                    '${req.body.time}',
                    ${req.body.tournament}
                )`;

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.send(JSON.stringify(result));
    });
});

router.post("/setMatchResults/:id", (req, res) => {
    let sql = `UPDATE
                    matches
                SET
                    team1_runs = '${req.body.team1_runs}',
                    team1_wickets = '${req.body.team1_wickets}',
                    team1_extras = '${req.body.team1_extras}',
                    team2_runs = '${req.body.team2_runs}',
                    team2_wickets = '${req.body.team2_wickets}',
                    team2_extras = '${req.body.team2_extras}',
                    winner = '${req.body.winner}',
                    statement = '${req.body.statement}'
                WHERE
                    id = $ { req.params.id }`;

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.json(result);
    });
});

router.get("/getMatches", (req, res) => {
    const sql = `SELECT * FROM matches`;

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.json(result);
    });
});

router.get("/getMatchPlayers/:id", (req, res) => {
    let sql = `SELECT
                    NAME,
                    logo
                FROM
                    teams
                WHERE
                    id =(
                    SELECT
                        team1
                    FROM
                        matches
                    WHERE
                        id = ${req.params.id}
                )`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        let team1 = JSON.parse(JSON.stringify(result[0]));

        // Team1 Players
        sql = `SELECT
                    *
                FROM
                    players
                WHERE
                    team =(
                    SELECT
                        team1
                    FROM
                        matches
                    WHERE
                        id = ${req.params.id}
                )`;
        db.query(sql, (err, result) => {
            if (err) throw err;

            team1.players = JSON.parse(JSON.stringify(result));

            sql = `SELECT
                        NAME,
                        logo
                    FROM
                        teams
                    WHERE
                        id =(
                        SELECT
                            team2
                        FROM
                            matches
                        WHERE
                            id = ${req.params.id}
                    )`;
            db.query(sql, (err, result) => {
                if (err) throw err;
                let team2 = JSON.parse(JSON.stringify(result[0]));

                // Team2 Players
                sql = `SELECT
                            *
                        FROM
                            players
                        WHERE
                            team =(
                            SELECT
                                team2
                            FROM
                                matches
                            WHERE
                                id = ${req.params.id}
                        )`;
                db.query(sql, (err, result) => {
                    if (err) throw err;

                    team2.players = JSON.parse(JSON.stringify(result));

                    res.json({ team1, team2 });
                });
            });
        });
    });
});

router.get("/getMatchBattingScoreboard/:match_id/:team_id", (req, res) => {
    let sql = `SELECT
                    batting_scoreboard.*
                FROM
                    batting_scoreboard
                LEFT JOIN players ON batting_scoreboard.player_id = players.id
                WHERE
                    match_id = ${req.params.match_id} AND players.team = ${req.params.team_id}`;

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.json(result);
    });
});

router.get("/getMatchBowlingScoreboard/:match_id/:team_id", (req, res) => {
    let sql = `SELECT
                    bowling_scoreboard.*
                FROM
                    bowling_scoreboard
                LEFT JOIN players ON bowling_scoreboard.player_id = players.id
                WHERE
                    match_id = ${req.params.match_id} AND players.team = ${req.params.team_id}`;

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.json(result);
    });
});

router.get("/getMatchResults/:id", (req, res) => {
    let sql = `SELECT
                    matches.*,
                    team1.name AS team1_name,
                    team1.logo AS team1_logo,
                    team2.name AS team2_name,
                    team2.logo AS team2_logo
                FROM
                    matches
                JOIN teams AS team1
                ON
                    matches.team1 = team1.id
                JOIN teams AS team2
                ON
                    matches.team2 = team2.id
                WHERE
                    matches.id = ${req.params.id}`;

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.json(result);
    });
});

router.put("/updateMatch/:id", (req, res) => {
    const sql = `UPDATE
                    matches
                SET
                    team1 = '${req.body.team1}',
                    team2 = '${req.body.team2}',
                    DATE = '${req.body.date}',
                    TIME = '${req.body.time}',
                    tournament_id = '${req.body.tournament_id}'
                WHERE
                    id = ${req.params.id}`;

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.send(JSON.stringify(result));
    });
});

router.delete("", (req, res) => {});

module.exports = router;
