var express = require("express");
var router=express.Router();
var mysql = require('mysql');

var con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "sugarbee"
});

router.put('/', function (req, res) {
    con.query('SELECT * FROM `orders` WHERE `deadline`=date(?)', [req.body.deadline], function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
});

module.exports=router;
