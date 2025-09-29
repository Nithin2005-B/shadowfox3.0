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
const SERVER_URL = "https://shadowfox3-0.onrender.com"; // Your Render backend
const apiUrl = (path) => SERVER_URL + path;

console.log("script.js loaded ✅");

// ==============================
// HELPER FUNCTION
// ==============================
function handleFormSubmit(form, fieldsMap, endpoint, successMessage) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent page reload
    console.log(`${form.id} submitted`);

    // Build payload from field IDs
    const payload = {};
    for (const [key, id] of Object.entries(fieldsMap)) {
      const el = document.getElementById(id);
      if (!el) {
        console.error(`Element with ID "${id}" not found`);
        return;
      }
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
      const res = await fetch(apiUrl(endpoint), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Server response:", data);
      alert(data.message || successMessage);
      form.reset();
    } catch (err) {
      console.error(`${form.id} Error:`, err);
      alert("⚠️ Unable to connect to server. Try again later.");
    }
  });
}

// ==============================
// APPOINTMENT FORM
// ==============================
const appointmentForm = document.getElementById("appointmentForm");
if (appointmentForm) {
  handleFormSubmit(
    appointmentForm,
    {
      name: "appointmentName",
      email: "appointmentEmail",
      phone: "appointmentPhone",
      message: "appointmentMessage",
    },
    "/api/appointment",
    "Appointment submitted successfully ✅"
  );
}

// ==============================
// TREATMENT / BOOKING FORM
// ==============================
const treatmentForm = document.getElementById("treatmentForm");
if (treatmentForm) {
  handleFormSubmit(
    treatmentForm,
    {
      treatment: "treatmentName",
      name: "treatmentCustomerName",
      email: "treatmentEmail",
      phone: "treatmentPhone",
    },
    "/api/booking",
    "Booking submitted successfully ✅"
  );
}

