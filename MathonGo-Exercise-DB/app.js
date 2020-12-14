const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/transactionDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const itemSchema = new mongoose.Schema({
  _id: String,
  title: String
});

const Item = mongoose.model("Item", itemSchema);

const bread = new Item({
  _id: "2z0pe61iP",
  title: "Bread"
});
const milk = new Item({
  _id: "2z0pe61iQ",
  title: "Milk"
});
const tea = new Item({
  _id: "2z0pe61iR",
  title: "Tea"
});
const sugar = new Item({
  _id: "2z0pe61iS",
  title: "Sugar"
});
const cream = new Item({
  _id: "2z0pe61iT",
  title: "Cream"
});

// Item.insertMany([bread, milk, tea, sugar, cream], (err) => {
//   err ? console.log(err) : console.log("Items inserted in database successfully!");
// });

const utmParamsSchema = new mongoose.Schema({
  source: String,
  medium: String,
  campaign: String,
  term: String
});

const UTMParam = mongoose.model("UTMParam", utmParamsSchema);
const params1 = new UTMParam({
  source: "google",
  medium: "seo_pages",
  campaign: "sale",
  term: null
});
//params1.save();

const orderSchema = new mongoose.Schema({
  _id: String,
  item: itemSchema,
  coupon: String,
  amount: Number,
  paid: Boolean,
  phone: String,
  email: String,
  utm_params: utmParamsSchema,
  order_id: String,
  payment_id: String,
}, {
  timestamps: true
});

const Order = mongoose.model("Order", orderSchema);


const order1 = new Order({
  _id: "-Scn3Xdtt",
  item: tea,
  coupon: "OFF30",
  amount: 2000,
  paid: true,
  phone: "1234567891",
  email: "jane.doe@email.com",
  utm_params: params1,
  order_id: "-Scn3Xdtt",
  payment_id: "276159124"
});
order1.save();
console.log("Order saved successfully");
