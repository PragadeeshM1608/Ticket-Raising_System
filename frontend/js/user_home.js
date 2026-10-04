document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("✅ Logged-in user:", user);
  const loginTime = new Date().toLocaleTimeString();

  if (user) {
    document.getElementById("user-name").textContent = user.username;

    document.getElementById("popup-username").textContent = user.username;
    document.getElementById("popup-email").textContent = user.email || "Not provided";
    document.getElementById("popup-role").textContent = user.role || "user";
    document.getElementById("popup-login-time").textContent = loginTime;

    localStorage.setItem("loginTime", loginTime);

    loadUserTickets(user.username);
  } else {
    document.getElementById("user-name").textContent = "Guest";
  }

  document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("user");
    alert("Logged out");
    window.location.href = "login.html";
  });

  // 🔧 Corrected: using the passed userId parameter
 async function loadUserTickets(username) {
  try {
    const url = `http://localhost:3000/api/tickets/user/${username}`; // 🟢 Using username
    const res = await fetch(url);
    const tickets = await res.json();
    
    console.log("Fetched Tickets:", tickets);

    if (!tickets || tickets.length === 0) {
      document.getElementById("no-tickets").style.display = "block";
      return;
    }

    const tableBody = document.getElementById("ticketTable").querySelector("tbody");
    tableBody.innerHTML = "";

    tickets.forEach(ticket => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${ticket._id}</td>
        <td>${ticket.priority}</td>
        <td>${ticket.title}</td>
        <td>${ticket.department}</td>
        <td>${ticket.status}</td>
        <td>${new Date(ticket.createdAt).toLocaleDateString()}</td>
        <td><button onclick="viewDetail('${ticket._id}')">View</button></td>
      `;
      tableBody.appendChild(tr);
    });
  } catch (err) {
    console.error("Failed to load user tickets", err);
  }
}

  // This must be on global scope for inline `onclick` to work
});

document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
})

function viewDetail(id) {
  window.location.href = `ticket_details.html?id=${id}`;
  };
console.log("✅ i am from front/user_home.js");
