const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
