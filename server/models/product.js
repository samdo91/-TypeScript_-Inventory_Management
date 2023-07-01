const mongoose = require("mongoose");

const ReceivingEventSchema = mongoose.Schema({
  date: String,
  employee_id: String,
  addProductQuantity: Number,
});

const ShippingEventSchema = mongoose.Schema({
  date: String,
  businessPartner_id: String,
  employee_id: String,
  orderedProductQuantity: Number,
  totalAmount: Number,
});

const ProductSchema = mongoose.Schema({
  productName: String,
  wholesalePrice: Number,
  retailPrice: Number,
  firstStock: Number,
  date: String,
  warehouseManager: String,
  receivingEventList: [ReceivingEventSchema],
  shippingEventList: [ShippingEventSchema],
  totalAmountReceived: Number,
  totalAmountShipped: Number,
  stock: Number,
});

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
