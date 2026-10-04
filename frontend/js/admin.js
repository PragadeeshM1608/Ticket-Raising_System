document.addEventListener("DOMContentLoaded", () => {
  const admin = JSON.parse(localStorage.getItem("user"));
  const loginTime = localStorage.getItem("loginTime") || new Date().toLocaleTimeString();
  
  if (admin) {
    document.getElementById("admin-name").textContent = admin.username;
    document.getElementById("popup-username").textContent = admin.username;
    document.getElementById("popup-email").textContent = admin.email || "Not provided";
    document.getElementById("popup-role").textContent = admin.role || "admin";
    document.getElementById("popup-login-time").textContent = loginTime;

    if (!localStorage.getItem("loginTime")) {
      localStorage.setItem("loginTime", loginTime);
    }
  } else {
    document.getElementById("admin-name").textContent = "Guest";
  }

  fetchTickets();
});

function fetchTickets() {
  fetch("http://localhost:3000/api/tickets/admin/all")
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector("#ticketTable tbody");
      const counts = { low: 0, mid: 0, high: 0, emergency: 0 };

      data.forEach(ticket => {
        counts[ticket.priority.toLowerCase()]++;

        const row = document.createElement("tr");
        row.innerHTML = `
          <td><input type="checkbox" data-id="${ticket._id}" /></td>
          <td>${ticket._id}</td>
          <td>${ticket.priority}</td>
          <td>${ticket.title}</td>
          <td>${ticket.department}</td>
          <td>${ticket.status}</td>
          <td>${new Date(ticket.createdAt).toLocaleString()}</td>
          <td><button onclick="viewTicket('${ticket._id}')">View</button></td>
        `;
        tbody.appendChild(row);
      });

      drawGraph(counts);
    })
    .catch((err) => {
      console.error("Failed to load tickets", err);
      alert("Failed to load tickets");
    });
}

function drawGraph(counts) {
  const ctx = document.getElementById("ticketChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Low", "Mid", "High", "Emergency"],
      datasets: [{
        label: "Tickets by Priority",
        data: [counts.low, counts.mid, counts.high, counts.emergency],
        backgroundColor: ["#74c69d", "#ffdd57", "#f3722c", "#d62828"]
      }]
    }
  });
}

function viewTicket(id) {
  window.location.href = `ticket_details.html?id=${id}`;
}

function deleteSelected() {
  const selected = Array.from(document.querySelectorAll("input[type='checkbox']:checked"));
  selected.forEach(cb => {
    fetch(`http://localhost:3000/api/tickets/${cb.dataset.id}`, {
      method: "DELETE"
    }).then(() => location.reload());
  });
}

function cancelSelected() {
  const selected = Array.from(document.querySelectorAll("input[type='checkbox']:checked"));
  selected.forEach(cb => {
    fetch(`http://localhost:3000/api/tickets/${cb.dataset.id}/cancel`, {
      method: "PUT"
    }).then(() => location.reload());
  });
}

function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("loginTime");
  window.location.href = "login.html";
}
