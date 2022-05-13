const express = require('express');
//const { nextTick } = require('vue');
const stockRoute = express.Router();

let StockModel = require('../models/stocks');

stockRoute.route('/').get((req, res) => {
    StockModel.find((error,data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

stockRoute.route('/add-stock').post((req, res, next) => {
    StockModel.create(req.body, (error,data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

stockRoute.route('/delete-stock/:id').delete((req, res, next) => {
    StockModel.findByIdAndRemove(req.params.id, (error,data) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json({
                msg:data
            })
        }
    })
})

module.exports = stockRoute;