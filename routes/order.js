const express =  require("express")
const orders = express.Router()
const cors = require("cors")
var Helpers = require("../utils/helpers")

const ordersModel = require("../models/orders")
const orderDetailModel = require("../models/order_detail")
orders.use(cors())

process.env.SECRET_KEY = 'sugarbee'

orders.post('/create', (req, res) => {
    const today =  new Date().toJSON();

    ordersModel.create(Helpers.fromCamelCaseToUnderScore({ 
        creatorId: req.body.CreatorId,
        created: today,
        customerName: req.body.customerName,
        contactNumber: req.body.contactNumber,
        email: req.body.email,
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        deadline: req.body.deadline,
        pickupLocation: req.body.pickupLocation,
        deliveryMethod: req.body.deliveryMethod,
        deliveryAddress: req.body.deliveryAddress,
        discountType: req.body.discountType,
        discountValue: req.body.discountValue,
        totalAmount: req.body.totalAmount,
        paymentStatus: req.body.paymentStatus,
        request: req.body.request,
        specialOffer: req.body.specialOffer
    })).then(ordersModel => {
        req.body.orders.map(orders => {
            orderDetailModel.create(Helpers.fromCamelCaseToUnderScore({
                orderId: ordersModel.identifier,
                itemName: orders.itemName,
                unitPrice: orders.unitPrice,
                quantity: orders.quantity,
                totalPrice: orders.totalPrice,
            }))
        })
        res.status(200).send("ORDER SUCCESSFULLY ADDED")
    })
    .catch(err => {
        res.status(500).send("ERROR OCCURED WHILE SAVING ORDERS")
    })
})

module.exports = orders;
