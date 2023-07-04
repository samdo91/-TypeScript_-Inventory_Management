const mongoose = require("mongoose");

const OutboundSchema = mongoose.Schema({
  note: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  date: { type: Date, required: true },
  product_id: { type: String, required: true },
  BusinessPartner_id: { type: String, required: true },
  stockOutboundQuantity: { type: Number, required: true },
});

const Outbound = mongoose.model("Outbound", OutboundSchema);

module.exports = Outbound;
