var express = require("express");
var router=express.Router();
var mysql = require("mysql");
var Helpers = require("../utils/helpers");

var con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "sugarbee"
});

router.get("/", function (req, res) {
    try {
        con.query("SELECT * FROM `orders` WHERE `created_date`=date(?)", [req.query.createdDate], function (error, results, fields) {
           if (error) throw error;
           res.status(200).send(JSON.stringify(Helpers.fromUnderScoreToCamelCase(results)));
        });
    } catch(e) {
        res.status(500).send({ result: "FAILED TO RETRIEVE ORDERS" });
    }

});

module.exports=router;
