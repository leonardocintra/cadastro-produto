let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let departmentSchema = new Schema({
    name: String
}, { versionKey: false });

module.exports = mongoose.model("Department", departmentSchema);
