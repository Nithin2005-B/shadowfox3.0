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
// ==============================
// CONFIG
// ==============================
const SERVER_URL = "https://shadowfox3-0.onrender.com"; // Backend URL
const apiUrl = (path) => SERVER_URL + path;

console.log("script.js loaded ✅");

function handleFormSubmit(formId, fieldsMap, endpoint, successMessage) {
  const form = document.getElementById(formId);
  if (!form) return console.error(`Form ${formId} not found`);

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent page reload
    console.log(`${formId} submitted`);

    const payload = {};
    for (const [key, id] of Object.entries(fieldsMap)) {
      const el = document.getElementById(id);
      if (!el) return console.error(`Element with ID "${id}" not found`);
      payload[key] = el.value.trim();
    }

    // Validate required fields
    for (const [key, value] of Object.entries(payload)) {
      if (!value) {
        alert(`⚠️ Please fill in ${key}`);
        return;
      }
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log("Server response:", data);
      alert(data.message || successMessage);
      form.reset();
    } catch (err) {
      console.error(`${formId} Error:`, err);
      alert("⚠️ Unable to connect to server. Try again later.");
    }
  });
}

// Appointment form
handleFormSubmit(
  "appointmentForm",
  {
    name: "appointmentName",
    email: "appointmentEmail",
    phone: "appointmentPhone",
    message: "appointmentMessage",
  },
  "/api/appointment",
  "Appointment submitted successfully ✅"
);

// Booking/Treatment form
handleFormSubmit(
  "treatmentForm",
  {
    treatment: "treatmentName",
    name: "treatmentCustomerName",
    email: "treatmentEmail",
    phone: "treatmentPhone",
  },
  "/api/booking",
  "Booking submitted successfully ✅"
);
