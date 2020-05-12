const express =  require("express")
const orders = express.Router()
const cors = require("cors")
var Helpers = require("../utils/helpers")
const Sequelize = require("sequelize")

const ordersModel = require("../models/orders")
const orderDetailModel = require("../models/order_detail")
orderDetailModel.belongsTo(ordersModel)
ordersModel.hasMany(orderDetailModel, { as: 'orderD' })
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
                orderIdentifier: ordersModel.identifier,
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


orders.get('/find', (req, res) => {
    console.log('Getting orders');
    const createdDate = req.body.createdDate;
    ordersModel.findAll({
        // attributes: [
        //     'identifier',
        //     'creator_id',
        //     [Sequelize.fn('date_format', Sequelize.col('created_date'), '%Y-%m-%d %h:%i %p'), 'created_date'],
        //     'customer_name',
        //     'contact_number',
        //     'email',
        //     'facebook',
        //     'instagram',
        //     'deadline',
        //     'pickup_location',
        //     'delivery_method',
        //     'delivery_address',
        //     'discount_type',
        //     'discount_value',
        //     'total_amount',
        //     'payment_status',
        //     'request',
        //     'special_offer',
        //     'deleted'
        // ],
        where: Sequelize.where(Sequelize.cast(Sequelize.col('created_date'), 'DATE'), '=', createdDate),
        include: [{
            attributes: [
                'identifier',
                'item_name'
            ],
            model: orderDetailModel,
            as: 'orderD'
        }],
        raw: true
    }).then(ordersModel => {
        res.status(200).send(JSON.stringify(Helpers.fromUnderScoreToCamelCase(ordersModel), null, 2));
        console.log(JSON.stringify(Helpers.fromUnderScoreToCamelCase(ordersModel), null, 2))
        console.log("Success")
    }).catch(err => {
        console.log(err)
        res.status(500).send("ERROR OCCURRED WHILE RETRIEVING ORDERS on " + req.body.deadline);
    });
})

orders.put('/:id', function(req, res){
    ordersModel.update(Helpers.fromCamelCaseToUnderScore({
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
    }),{
        where: { identifier: req.params.id }
    }
    )
})

module.exports = orders;
