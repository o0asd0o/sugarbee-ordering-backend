var express = require("express");
var router=express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sugarbee"
});

router.put('/orders', function (req, res) {
    con.query('UPDATE `orders` SET `customer_name`=?,`contact_number`=?,`email`=?,`facebook`=?,`instagram`=?,`pickup_location`=?,`delivery_method`=?,`delivery_address`=?,`discount_type`=?,`discount_value`=?,`total_amount`=?,`payment_status`=?,`request`=?,`special_offer`=? where `identifier`=?', [req.body.customer_name,req.body.contact_number, req.body.email, req.body.facebook, req.body.instagram, req.body.pickup_location, req.body.delivery_method, req.body.delivery_address, req.body.discount_type, req.body.discount_value, req.body.total_amount, req.body.payment_status, req.body.request, req.body.special_offer, req.body.identifier], function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });

module.exports=router;