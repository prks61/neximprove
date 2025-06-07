const mongoose = require("mongoose");

const filingSchema = new mongoose.Schema({
  shipmentId: {
    type: String,
    required: true,
    unique: true,
  },
  invoiceNumber: {
    type: String,
    required: true,
  },
  invoiceValue: {
    type: Number,
    required: true,
    min: 0,
  },
  port: {
    type: String,
    required: true,
  },
  items: [
    {
      description: String,
      quantity: Number,
      value: Number,
    },
  ],
  status: {
    type: String,
    enum: ["DRAFT", "SUBMITTED", "APPROVED", "REJECTED"],
    default: "DRAFT",
  },
  submissionDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Filing", filingSchema);
