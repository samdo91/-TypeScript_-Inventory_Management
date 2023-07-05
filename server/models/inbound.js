const mongoose = require("mongoose");

const AddInboundSchema = mongoose.Schema({
  addProductQuantity: { type: Number, required: true },
  date: { type: Date, required: true },
  product_id: { type: String, required: true },
  employee_id: { type: String, required: true },
  note: { type: String, required: true },
});

const InboundModel = mongoose.model("Inbound", AddInboundSchema);

module.exports = InboundModel;
