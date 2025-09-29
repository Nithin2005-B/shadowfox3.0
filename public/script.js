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
const SERVER_URL = "https://shadowfox3-0.onrender.com";
const apiUrl = (path) => SERVER_URL + path;

console.log("script.js loaded ✅");

// ==============================
// Appointment Form Submit
// ==============================
const appointmentForm = document.getElementById("appointmentForm");

if (appointmentForm) {
  console.log("Appointment form script active");

  appointmentForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Appointment form submitted");

    const name = document.getElementById("appointmentName").value.trim();
    const email = document.getElementById("appointmentEmail").value.trim();
    const phone = document.getElementById("appointmentPhone").value.trim();
    const message = document.getElementById("appointmentMessage").value.trim();

    if (!name || !email || !phone) {
      alert("⚠️ Please fill all required fields");
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
// Treatment / Booking Form Submit
// ==============================
const treatmentForm = document.getElementById("treatmentForm");

if (treatmentForm) {
  console.log("Treatment form script active");

  treatmentForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Treatment form submitted");

    const treatment = document.getElementById("treatmentName").value.trim();
    const name = document.getElementById("treatmentCustomerName").value.trim();
    const email = document.getElementById("treatmentEmail").value.trim();
    const phone = document.getElementById("treatmentPhone").value.trim();

    if (!treatment || !name || !email || !phone) {
      alert("⚠️ Please fill all required fields");
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
      treatmentForm.reset();
    } catch (err) {
      console.error("Booking Error:", err);
      alert("⚠️ Unable to connect to server. Try again later.");
    }
  });
}
