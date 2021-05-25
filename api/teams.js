const express = require("express");
const multer = require("multer");
const path = require("path");
const db = require("../config/database");

const router = express.Router();

const storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

let upload = multer({ storage });

router.post("/createTeam", upload.single("logo"), (req, res) => {
    let query = `INSERT INTO teams(
                name,
                logo,
                coach,
                coach_experience,
                coach_expertise,
                coach_dob,
                sponsor
            )
            VALUES(
                '${req.body.name}',
                '/uploads/${req.file.filename}',
                '${req.body.coach}',
                '${req.body.coach_experience}',
                '${req.body.coach_expertise}',
                '${req.body.coach_dob}',
                '${req.body.sponsor}'
            )`;
    db.query(query, (err, result) => {
        if (err) throw err;

        res.send(JSON.stringify(result));
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

router.get("/getTeamPlayers/:id", (req, res) => {
    const sql = `SELECT * FROM players where team = ${req.params.id}`;

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.json(result);
    });
});

router.get("/getTeamCoach/:id", (req, res) => {
    const sql = `SELECT
                    coach,
                    coach_dob,
                    coach_experience,
                    coach_expertise
                FROM
                    teams
                WHERE
                    id = ${req.params.id}`;

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.send(JSON.stringify(result));
    });
});

router.put("/updateTeam/:id", (req, res) => {
    const sql = `UPDATE
                    teams
                SET NAME
                    = '${req.body.name}',
                    logo = '${req.body.logo}',
                    is_active = '${req.body.is_active}',
                    sponsor = '${req.body.sponsor}'
                WHERE
                    id = ${req.params.id}`;

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.send(JSON.stringify(result));
    });
});

router.put("/updateTeamCoach/:id", (req, res) => {
    const sql = `UPDATE
                    teams
                SET
                    coach = '${req.body.coach}',
                    coach_dob = '${req.body.coach_dob}',
                    coach_experience = '${req.body.coach_experience}',
                    coach_expertise = '${req.body.coach_expertise}'
                WHERE
                    id = ${req.params.id}`;

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.send(JSON.stringify(result));
    });
});

router.delete("/deleteTeam/:id", (req, res) => {
    const sql = `DELETE FROM teams WHERE id = ${req.params.id}`;

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.send(JSON.stringify(result));
    });
});

module.exports = router;
