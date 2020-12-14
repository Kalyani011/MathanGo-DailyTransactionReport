require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const time = require("./time.js");
const email = require("./email.js");
const records = require("./records.js");

const app = express();

mongoose.connect("mongodb://localhost:27017/transactionDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const itemSchema = new mongoose.Schema({
  _id: String,
  title: String
});

const utmParamsSchema = new mongoose.Schema({
  source: String,
  medium: String,
  campaign: String,
  term: String
});

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

let report = {};
report.numberOfTransactions = 0;
report.numberOfSuccessfulTransactions = 0;
report.volumeInINR = 0;

app.get("/", (req, res) => {
  if (time(new Date) === "11:27 pm") {
    Order.find((err, orders) => {
      if(!err){
        let transactions = [];
        orders.forEach((order) => {
          report.numberOfTransactions++;
          if (order.paid) {
            report.numberOfSuccessfulTransactions++;
          }
          report.volumeInINR += order.amount;
          transactions.push(records.createRecord(order, report.numberOfTransactions));
        });
        records.writeRecords(transactions);
        email(report);
        res.send("Transaction report generated and emailed Successfully!");
      }else{
        res.send(err);
      }
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
