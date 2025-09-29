// ======================
// Toggle Navbar
// ======================
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-links");

  if (toggle) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }

// ==============================
// CONFIG
// ==============================
// Replace with your deployed server URL or leave empty for local testing
const SERVER_URL = "https://shadowfox3-0.onrender.com"; // leave "" if running locally

// Helper function to build full API URL
const apiUrl = (path) => (SERVER_URL ? SERVER_URL + path : path);

// ==============================
// Appointment Form Submit
// ==============================
const appointmentForm = document.getElementById("appointmentForm");

if (appointmentForm) {
  console.log("Appointment form script loaded ✅");

  appointmentForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Appointment form submitted");

    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const phone = document.getElementById("phone")?.value.trim();
    const message = document.getElementById("message")?.value.trim();

    console.log({ name, email, phone, message });

    if (!name || !email || !phone) {
      alert("⚠️ Please fill in all required fields.");
      return;
    }

    try {
      const res = await fetch(apiUrl("/api/appointment"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });

      const data = await res.json();
      console.log("Server response:", data);
      alert(data.message || "Appointment submitted successfully ✅");
      appointmentForm.reset();
    } catch (err) {
      console.error("Appointment Error:", err);
      alert("⚠️ Unable to connect to server. Try again later.");
    }
  });
}

// ==============================
// Booking Form Submit
// ==============================
const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
  console.log("Booking form script loaded ✅");

  bookingForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Booking form submitted");

    const treatment = document.getElementById("treatment")?.value.trim();
    const name = document.getElementById("bname")?.value.trim();
    const email = document.getElementById("bemail")?.value.trim();
    const phone = document.getElementById("bphone")?.value.trim();

    console.log({ treatment, name, email, phone });

    if (!treatment || !name || !email || !phone) {
      alert("⚠️ Please fill in all required fields.");
      return;
    }

    try {
      const res = await fetch(apiUrl("/api/booking"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ treatment, name, email, phone }),
      });

      const data = await res.json();
      console.log("Server response:", data);
      alert(data.message || "Booking submitted successfully ✅");
      bookingForm.reset();
    } catch (err) {
      console.error("Booking Error:", err);
      alert("⚠️ Unable to connect to server. Try again later.");
    }
  });
}

