const express = require("express");
const db = require("../config/database");

const router = express.Router();

router.post("/createPlayer", (req, res) => {
    const sql = `INSERT INTO players (name, dob, height, role, batting_style, bowling_style, team) VALUES ('${req.body.name}', '${req.body.dob}', '${req.body.height}', '${req.body.role}', '${req.body.batting_style}', '${req.body.bowling_style}', '${req.body.teamID}')`;
    db.query(sql, (err, result) => {
        if (err) throw err;

        res.send(JSON.stringify(result));
    });
});

router.post("/setPlayerBattingScore/:id", (req, res) => {
    let runs = req.body.fours + req.body.sixes + req.body.singles;
    const sql = `INSERT INTO batting_scoreboard (player_id, match_id, runs, balls, sixes, fours, singles, strike_rate) VALUES ('${req.params.id}', '${req.body.match_id}', '${runs}', '${req.body.balls}', '${req.body.sixes}', '${req.body.fours}', '${req.body.singles}', '${req.body.strike_rate}')`;
    db.query(sql, (err, result) => {
        if (err) throw err;

        res.send(JSON.stringify(result));
    });
});

router.post("/setPlayerBowlingScore/:id", (req, res) => {
    const sql = `INSERT INTO bowling_scoreboard (player_id, match_id, overs, median, runs, wickets, econ, dots) VALUES ('${req.params.id}', '${req.body.match_id}', '${req.body.overs}', '${req.body.median}', '${req.body.runs}', '${req.body.wickets}', '${req.body.econ}', '${req.body.dots}')`;
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

router.get("/getTeamPlayers/:id", (req, res) => {
    const sql = `SELECT * FROM players where team = ${req.params.id}`;

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

router.put("/updatePlayer/:id", (req, res) => {
    // const name = req.body.name ? "name = '" + req.body.name + "', " : "";
    // const dob = req.body.dob ? "dob = '" + req.body.dob + "', " : "";
    // const role = req.body.role ? "role = '" + req.body.role + "', " : "";
    // const batting_style = req.body.batting_style
    //     ? "batting_style = '" + req.body.batting_style + "', "
    //     : "";
    // const bowling_style = req.body.bowling_style
    //     ? "bowling_style = '" + req.body.bowling_style + "', "
    //     : "";
    // const teamID = req.body.teamID ? "team = '" + req.body.teamID + "', " : "";
    // const matches_played = req.body.matches_played
    //     ? "matches_played = " + req.body.matches_played
    //     : "";

    // const sql =
    //     "UPDATE players SET  " +
    //     name +
    //     dob +
    //     role +
    //     batting_style +
    //     bowling_style +
    //     teamID +
    //     matches_played +
    //     " WHERE id = " +
    //     req.params.id;

    const sql = `UPDATE players SET name = '${req.body.name}', role = '${req.body.role}', dob = '${req.body.dob}', batting_style = '${req.body.batting_style}', bowling_style = '${req.body.bowling_style}', team = ${req.body.teamID} WHERE id = ${req.params.id}`;
    console.log(sql);

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
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
