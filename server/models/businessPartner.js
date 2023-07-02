const mongoose = require("mongoose");

const BusinessPartnerSchema = mongoose.Schema({
  BusinessPartnerName: { type: String, required: true },
  owner: { type: String, required: true },
  email: { type: String, required: true },
  telephoneNumber: { type: String, required: true },
  manager: { type: String, required: true },
  credit: { type: Number, default: 0 },
  nete: { type: String, required: true },
});

const BusinessPartnerModel = mongoose.model(
  "BusinessPartner",
  BusinessPartnerSchema
);

module.exports = BusinessPartnerModel;
