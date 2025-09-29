// server.js

const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================
// Serve Frontend Files
// ============================
app.use(express.static(path.join(__dirname, "public"))); // your HTML, CSS, JS in /public

// Optional: redirect unknown routes to index.html
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ============================
// MongoDB Connection
// ============================
const MONGO_URI = "mongodb+srv://dental_user:Test12345!@cluster0.ndjusmm.mongodb.net/dental?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ============================
// Nodemailer Transporter (Gmail, port 587)
// ============================
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,        // false for TLS
  requireTLS: true,
  auth: {
    user: "bandrinithin24@gmail.com",   // Your Gmail
    pass: "yhxhncshvtjzgsxh"   // Gmail App Password
  }
});

// ============================
// MongoDB Schemas
// ============================
const appointmentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const bookingSchema = new mongoose.Schema({
  treatment: String,
  name: String,
  email: String,
  phone: String,
  emergencyPhone: String,
  date: { type: Date, default: Date.now }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
const Booking = mongoose.model("Booking", bookingSchema);

// ============================
// Routes
// ============================

// Test route
app.get("/", (req, res) => {
  res.send("Sakthi Dental Clinic Server Running");
});

// ============================
// Appointment
// ============================
app.post("/appointment", async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();

    await transporter.sendMail({
      from: '"Sakthi Dental Clinic" <bandrinithin24@gmail.com>',
      to: `${req.body.email}, bandrinithin24@gmail.com`,
      subject: "Appointment Confirmation",
      text: `Hello ${req.body.name},

Your appointment has been submitted successfully.

Details:
Phone: ${req.body.phone}
Message: ${req.body.message}
Date: ${new Date().toLocaleString()}

Emergency Phone: 9480543608

- Sakthi Dental Clinic`
    });

    res.json({ success: true, message: "Appointment submitted successfully!" });
  } catch (err) {
    console.error("Appointment Error:", err);
    res.status(500).json({ success: false, message: "Error saving appointment." });
  }
});

// ============================
// Booking / Treatment
// ============================
app.post("/book", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();

    await transporter.sendMail({
      from: '"Sakthi Dental Clinic" <bandrinithin24@gmail.com>',
      to: `${req.body.email}, bandrinithin24@gmail.com`,
      subject: "Treatment Booking Confirmation",
      text: `Hello ${req.body.name},

Your treatment booking has been submitted successfully.

Details:
Treatment: ${req.body.treatment}
Phone: ${req.body.phone}
Emergency Phone: ${req.body.emergencyPhone}
Date: ${new Date().toLocaleString()}

- Sakthi Dental Clinic`
    });

    res.json({ success: true, message: "Booking submitted successfully!" });
  } catch (err) {
    console.error("Booking Error:", err);
    res.status(500).json({ success: false, message: "Error saving booking." });
  }
});

// ============================
// Start Server
// ============================
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
