const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'order_details',
    {
        identifier: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        order_identifier: {
            type: Sequelize.INTEGER
        },
        item_name: {
            type: Sequelize.STRING
        },
        unit_price: {
            type: Sequelize.FLOAT
        },
        quantity: {
            type: Sequelize.INTEGER
        },
        total_price: {
            type: Sequelize.FLOAT
        },
    },
    {
        timestamps: false,
        underscored: true
    }
)
