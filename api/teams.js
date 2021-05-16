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
    let query = "SELECT MAX(`id`) as id FROM `teams`";

    db.query(query, (err, result) => {
        if (err) throw err;
        result = JSON.parse(JSON.stringify(result));

        query = `INSERT INTO teams (id, name, logo, coach, coach_experience, coach_expertise, coach_dob, sponsor) VALUES ('${
            result[0].id + 1
        }', '${req.body.name}', '/uploads/${req.file.filename}', '${
            req.body.coach
        }', '${req.body.coach_experience}', '${req.body.coach_expertise}', '${
            req.body.coach_dob
        }', '${req.body.sponsor}')`;

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

router.get("/getTeamCoach/:id", (req, res) => {
    const sql = `SELECT  coach, coach_dob, coach_experience, coach_expertise FROM teams where id = ${req.params.id}`;

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.send(JSON.stringify(result));
    });
});

router.put("/updateTeam/:id", (req, res) => {
    const sql = `UPDATE teams SET name = '${req.body.name}', logo = '${req.body.logo}', sponsor = '${req.body.sponsor}' WHERE id = ${req.params.id}`;
    console.log(sql);

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(JSON.stringify(result));
    });
});

router.put("/updateTeamCoach/:id", (req, res) => {
    const sql = `UPDATE teams SET coach = '${req.body.coach}', coach_dob = '${req.body.coach_dob}', coach_experience = '${req.body.coach_experience}', coach_expertise = '${req.body.coach_expertise}' WHERE id = ${req.params.id}`;
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
