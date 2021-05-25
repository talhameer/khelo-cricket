const express = require("express");
const db = require("../config/database");

const router = express.Router();

router.post("/createPlayer", (req, res) => {
    const sql = `INSERT INTO players(
                    NAME,
                    dob,
                    height,
                    role,
                    batting_style,
                    bowling_style,
                    team
                )
                VALUES(
                    '${req.body.name}',
                    '${req.body.dob}',
                    '${req.body.height}',
                    '${req.body.role}',
                    '${req.body.batting_style}',
                    '${req.body.bowling_style}',
                    '${req.body.teamID}'
                )`;

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.send(JSON.stringify(result));
    });
});

router.post("/setPlayerBattingScore/:id", (req, res) => {
    let runs =
        parseInt(req.body.fours) * 4 +
        parseInt(req.body.sixes) * 6 +
        parseInt(req.body.singles);
    const sql = `INSERT INTO batting_scoreboard(
                    player_id,
                    match_id,
                    runs,
                    balls,
                    sixes,
                    fours,
                    singles,
                    strike_rate
                )
                VALUES(
                    '${req.params.id}',
                    '${req.body.match_id}',
                    '${runs}',
                    '${req.body.balls}',
                    '${req.body.sixes}',
                    '${req.body.fours}',
                    '${req.body.singles}',
                    '${req.body.strike_rate}'
                )`;

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.send(JSON.stringify(result));
    });
});

router.post("/setPlayerBowlingScore/:id", (req, res) => {
    const sql = `INSERT INTO bowling_scoreboard(
                    player_id,
                    match_id,
                    overs,
                    median,
                    runs,
                    wickets,
                    econ,
                    dots
                )
                VALUES(
                    '${req.params.id}',
                    '${req.body.match_id}',
                    '${req.body.overs}',
                    '${req.body.median}',
                    '${req.body.runs}',
                    '${req.body.wickets}',
                    '${req.body.econ}',
                    '${req.body.dots}'
                )`;

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.send(JSON.stringify(result));
    });
});

router.get("/getPlayers", (req, res) => {
    const sql = "SELECT * FROM `players`";

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.send(JSON.stringify(result));
    });
});

router.get("/getPlayer/:id", (req, res) => {
    const sql = "SELECT * FROM `players` where id=" + req.params.id;

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.send(JSON.stringify(result));
    });
});

router.get("/getPlayerBattingStats/:id", (req, res) => {
    const sql = `SELECT
                    COUNT(match_id) AS total_matches,
                    SUM(runs) AS runs,
                    MAX(runs) AS high_score,
                    AVG(runs) AS average,
                    AVG(strike_rate) AS strike_rate,
                    (SELECT COUNT(*) FROM batting_scoreboard WHERE runs >= 50 AND player_id = ${req.params.id}) AS fifties,
                    (SELECT COUNT(*) FROM batting_scoreboard WHERE runs >= 100 AND player_id = ${req.params.id}) AS centuries,
                    SUM(sixes) AS sixes,
                    SUM(fours) AS fours
                FROM
                    batting_scoreboard
                WHERE
                    player_id = ${req.params.id}
                GROUP BY
                    player_id`;

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.json(result);
    });
});

router.get("/getPlayerBowlingStats/:id", (req, res) => {
    const sql = `SELECT
                    COUNT(match_id) AS total_matches,
                    SUM(runs) AS runs,
                    SUM(wickets) AS wickets,
                    AVG(econ) AS econ,
                    AVG(runs) AS average,
                    (SELECT COUNT(*) FROM bowling_scoreboard WHERE wickets >= 5 AND player_id = ${req.params.id}) AS five_w
                FROM
                    bowling_scoreboard
                WHERE
                    player_id = 2
                GROUP BY
                    player_id`;

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.json(result);
    });
});

router.put("/updatePlayer/:id", (req, res) => {
    const sql = `UPDATE
                    players
                SET NAME
                    = '${req.body.name}',
                    role = '${req.body.role}',
                    dob = '${req.body.dob}',
                    batting_style = '${req.body.batting_style}',
                    bowling_style = '${req.body.bowling_style}',
                    team = ${req.body.teamID},
                    is_retired = ${req.body.is_retired}
                WHERE
                    id = ${req.params.id}`;

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.send(JSON.stringify(result));
    });
});

router.delete("/deletePlayer/:id", (req, res) => {
    const sql = `DELETE FROM players WHERE id = ${req.params.id}`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(JSON.stringify(result));
    });
});

module.exports = router;
