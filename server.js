// ============================
// SERVER.JS
// ============================

const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================
// MongoDB Connection
// ============================
const MONGO_URI =
  "mongodb+srv://dental_user:Test12345!@cluster0.ndjusmm.mongodb.net/dental?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ============================
// Nodemailer Transporter
// ============================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bandrinithin24@gmail.com", // Your Gmail
    pass: "yhxhncshvtjzgsxh",        // Gmail App Password
  },
});

// ============================
// MongoDB Schemas
// ============================
const appointmentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  date: { type: Date, default: Date.now },
});

const bookingSchema = new mongoose.Schema({
  treatment: String,
  name: String,
  email: String,
  phone: String,
  date: { type: Date, default: Date.now },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
const Booking = mongoose.model("Booking", bookingSchema);

// ============================
// Routes
// ============================

// Test route
app.get("/api", (req, res) => {
  res.send("Sakthi Dental Clinic Server Running");
});

// Appointment
app.post("/api/appointment", async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();

    // Send email notification
    await transporter.sendMail({
      from: '"Sakthi Dental Clinic" <bandrinithin24@gmail.com>',
      to: `${req.body.email}, bandrinithin24@gmail.com`, // Patient + Clinic
      subject: "Appointment Confirmation",
      text: `Hello ${req.body.name},

Your appointment has been submitted successfully.

Details:
Phone: ${req.body.phone}
Message: ${req.body.message}
Date: ${new Date().toLocaleString()}

- Sakthi Dental Clinic`,
    });

    res.json({ success: true, message: "Appointment submitted successfully!" });
  } catch (err) {
    console.error("Appointment Error:", err);
    res
      .status(500)
      .json({ success: false, message: "Error saving appointment." });
  }
});

// Booking / Treatment
app.post("/api/booking", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();

    // Send email notification
    await transporter.sendMail({
      from: '"Sakthi Dental Clinic" <bandrinithin24@gmail.com>',
      to: `${req.body.email}, bandrinithin24@gmail.com`, // Patient + Clinic
      subject: "Treatment Booking Confirmation",
      text: `Hello ${req.body.name},

Your treatment booking has been submitted successfully.

Details:
Treatment: ${req.body.treatment}
Phone: ${req.body.phone}
Date: ${new Date().toLocaleString()}

- Sakthi Dental Clinic`,
    });

    res.json({ success: true, message: "Booking submitted successfully!" });
  } catch (err) {
    console.error("Booking Error:", err);
    res.status(500).json({ success: false, message: "Error saving booking." });
  }
});

// ============================
// Serve Static Frontend
// ============================
app.use(express.static(path.join(__dirname, "public")));

// If no route matches, serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ============================
// Start Server
// ============================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
