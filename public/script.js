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
// Appointment Form Submit
// ==============================
const appointmentForm = document.getElementById("appointmentForm");
if (appointmentForm) {
  appointmentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });

      const data = await res.json();
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
  bookingForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const treatment = document.getElementById("treatment").value.trim();
    const name = document.getElementById("bname").value.trim();
    const email = document.getElementById("bemail").value.trim();
    const phone = document.getElementById("bphone").value.trim();

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ treatment, name, email, phone }),
      });

      const data = await res.json();
      alert(data.message || "Booking submitted successfully ✅");
      bookingForm.reset();
    } catch (err) {
      console.error("Booking Error:", err);
      alert("⚠️ Unable to connect to server. Try again later.");
    }
  });
}

