document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    alert("No ticket ID found.");
    return;
  }

  fetch(`http://localhost:3000/api/tickets/${id}`)
    .then(res => res.json())
    .then(ticket => {
      document.getElementById("ticketid").innerText = ticket._id;
      document.getElementById("ticketName").innerText = ticket.ticketName;
      document.getElementById("priority").innerText = ticket.priority;
      document.getElementById("title").innerText = ticket.title;
      document.getElementById("department").innerText = ticket.department;
      document.getElementById("description").innerText = ticket.description || 'No description provided.';
      document.getElementById("customerName").innerText = ticket.customerName || 'Unknown';
      document.getElementById("status").innerText = ticket.status;
      document.getElementById("email").innerText = ticket.email || 'Not provided';

      if (ticket.attachment) {
        document.getElementById("attachment").innerHTML = 
          `<a href="../backend/uploads/${ticket.attachment}" target="_blank">${ticket.attachment}</a>`;
      } else {
        document.getElementById("attachment").innerText = "No attachment.";
      }
    })
    .catch(err => {
      alert("Failed to load ticket details");
      console.error(err);
    });
});

function backtohome(){
  const user = JSON.parse(localStorage.getItem("user"));

  alert("Are you sure");

  if (user && user.role === "admin") {
    window.location.href = "admin_dashboard.html";
  } else {
    window.location.href = "user_home.html";
  }

}
