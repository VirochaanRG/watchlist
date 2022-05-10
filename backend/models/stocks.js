const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let stockSchema = new Schema({
    name: {
        type: String
    }
}, {
    collection: 'stocks'
})

module.exports = mongoose.model('Stock', stockSchema);