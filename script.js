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

  // =========================
  // Appointment Form
  // =========================
  const appointmentForm = document.getElementById("appointmentForm");
  if (appointmentForm) {
    appointmentForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("appointmentName").value;
      const email = document.getElementById("appointmentEmail").value;
      const phone = document.getElementById("appointmentPhone").value;
      const message = document.getElementById("appointmentMessage").value;

      try {
        const res = await fetch("http://localhost:5000/appointment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, phone, message })
        });

        const data = await res.json();
        if (data.success) {
          alert("Appointment submitted successfully!");
          appointmentForm.reset();
        } else {
          alert("⚠️ " + data.message);
        }
      } catch (err) {
        console.error(err);
        alert("⚠️ Unable to connect to server. Try again later.");
      }
    });
  }

  // =========================
  // Booking / Treatment Form
  // =========================
  const bookingForm = document.getElementById("treatmentForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const treatment = document.getElementById("treatmentName").value;
      const name = document.getElementById("treatmentCustomerName").value;
      const email = document.getElementById("treatmentEmail").value;
      const phone = document.getElementById("treatmentPhone").value;

      try {
        const res = await fetch("http://localhost:5000/booking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ treatment, name, email, phone })
        });

        const data = await res.json();
        if (data.success) {
          alert("Booking submitted successfully!");
          bookingForm.reset();
        } else {
          alert("⚠️ " + data.message);
        }
      } catch (err) {
        console.error(err);
        alert("⚠️ Unable to connect to server. Try again later.");
      }
    });
  }

});
