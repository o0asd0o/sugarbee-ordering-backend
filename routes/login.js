var express = require("express");
var router=express.Router();
var mysql = require('mysql');

var con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "sugarbee"
});

router.post("/", function(req, res, next) {
    const { username, password } = req.body;
    const queryString = `
        SELECT username, password
        FROM users
        WHERE username='${username}'
        AND password='${password}'
    `;
    try {
        con.query(queryString, function (err, result, fields) {
            if (err) throw err;

            if (result.length > 0) {
                res.status(200).send({ result: "SUCCESS" });
            } else {
                res.status(500).send({ result: "FAILED TO LOGIN" });
            }
        });
    } catch(e) {
        res.status(500).send({ result: "FAILED TO LOGIN" });
    }
});

module.exports=router;
