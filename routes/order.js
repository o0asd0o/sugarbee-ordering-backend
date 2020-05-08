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
        req.body.orders.map(orders => {
            orderDetailModel.create({
                order_id: ordersModel.identifier,
                item_name: orders.item_name,
                unit_price: orders.unit_price,
                quantity: orders.quantity,
                total_price: orders.total_price,
            }).then(orderDetailModel => {
            })
        })
        res.status(200).send("ORDER SUCCESSFULLY ADDED")
    })
    .catch(err => {
        res.status(500).send("ERROR OCCURED WHILE SAVING ORDERS")
    })
})

module.exports = orders;
