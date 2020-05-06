const express =  require("express")
const orders = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const ordersModel = require("../models/orders")
const orderDetailModel = require("../models/order_detail")
orders.use(cors())

process.env.SECRET_KEY = 'sugarbee'

orders.post('/create', (req, res) => {
    const today =  new Date().toJSON();
    const orderdData = {
        order_id: req.body.order_id,
        item_name: req.body.item_name,
        unit_price: req.body.unit_price,
        quantity: req.body.quantity,
        total_price: req.body.total_price,
    }

    ordersModel.create({ 
        creator_id: req.body.creator_id,
        created: today,
        customer_name: req.body.customer_name,
        contact_number: req.body.contact_number,
        email: req.body.email,
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        deadline: req.body.deadline,
        pickup_location: req.body.pickup_location,
        delivery_method: req.body.delivery_method,
        delivery_address: req.body.delivery_address,
        discount_type: req.body.discount_type,
        discount_value: req.body.discount_value,
        total_amount: req.body.total_amount,
        payment_status: req.body.payment_status,
        request: req.body.request,
        special_offer: req.body.special_offer
    }).then(ordersModel => {
        orderDetailModel.create({
            order_id: ordersModel.identifier,
            item_name: req.body.item_name,
            unit_price: req.body.unit_price,
            quantity: req.body.quantity,
            total_price: req.body.total_price,
        }).then(orderDetailModel => {
            console.log(ordersModel.get({
              plain: true
            }),
                orderDetailModel.get({
                plain: true
              })
            );
            res.status(200).send("ORDER SUCCESSFULLY ADDED")
        })
    })
    .catch(err => {
        res.status(500).send("ERROR OCCURED WHILE SAVING ORDERS")
    })
})

module.exports = orders;
