const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    email: {type: String }
}, { timestamps: true });

const Company = mongoose.model("company", companySchema);

module.exports = Company;
