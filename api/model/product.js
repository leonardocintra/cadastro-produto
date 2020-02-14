let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productSchema = new Schema({
    name: String,
    price: Number,
    stock: Number,
    departments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Department" }]
}, { versionKey: false });

module.exports = mongoose.model("Product", productSchema);
