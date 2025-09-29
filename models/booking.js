const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  treatment: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
