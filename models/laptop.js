const mongoose = require('mongoose');

const laptopSchema = new mongoose.Schema({
    name: String,
    specs: String,
    price: Number
});

module.exports = mongoose.model('Laptop', laptopSchema);

