const mongoose = require("mongoose");

const TableItemSchema = mongoose.Schema({
  productCode: Number,
  productName: String,
  stock: Number,
  wholesalePrice: Number,
  retailPrice: Number,
});

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

const AddProductSchema = mongoose.Schema({
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

const ProductSchema = mongoose.Schema({
  productCode: Number,
  ...AddProductSchema.obj,
});

const TableItemModel = mongoose.model("TableItem", TableItemSchema);
const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = {
  TableItemModel,
  ProductModel,
};
