document.getElementById("ticketForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.username) {
    document.getElementById("userId").value = user.username; // or user._id if you store that
  } else {
    document.getElementById("userId").value = "Guest";
  }

  const userId = document.getElementById("userId").value.trim();
  const ticketName = document.getElementById("ticketName").value.trim();
  const priority = document.getElementById("priority").value.trim();
  const title = document.getElementById("title").value.trim();
  const department = document.getElementById("department").value.trim();
  const description = document.getElementById("description").value.trim();
  const customerName = document.getElementById("customerName").value.trim();
  const email = document.getElementById("email").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  if (!ticketName || !priority || !title || !department || !customerName || !email) {
    errorMsg.textContent = "Please fill all required fields.";
    return;
  }

  console.log(ticketName);
  console.log(priority);
  console.log(title);
  console.log(department);
  console.log(description);
  console.log(customerName);
  console.log(userId);
  const formData = new FormData();

  formData.append("userId", userId);
  formData.append("ticketName", ticketName);
  formData.append("priority", priority);
  formData.append("title", title);
  formData.append("department", department);
  formData.append("description", description);
  formData.append("customerName", customerName);
  formData.append("email", email);

  const fileInput = document.getElementById("attachment");
  if (fileInput && fileInput.files.length > 0) {
    formData.append("attachment", fileInput.files[0]);
    console.log("this file info",fileInput);
    console.log("this file info",fileInput.files);
    console.log("this file info",fileInput.files.length);
    console.log("this file info",fileInput.files[0]);
  }else{
    console.log("from new ticket file not reciving")
  }


  try {
    const response = await fetch("http://localhost:3000/api/tickets", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

   if (!response.ok) {
  errorMsg.textContent = result.message || "Ticket creation failed.";
} else {
  alert("Ticket submitted successfully!");

  const user = JSON.parse(localStorage.getItem("user"));
  

  if (user && user.role === "admin") {
    window.location.href = "admin_dashboard.html";
  } else {
    window.location.href = "user_home.html";
  }
}
  } catch (err) {
    console.error(err);
    errorMsg.textContent = "Server error. Try again.";
  }
})

function cancel(){
  const user = JSON.parse(localStorage.getItem("user"));

  alert("Are you sure to cancel");

  if (user && user.role === "admin") {
    window.location.href = "admin_dashboard.html";
  } else {
    window.location.href = "user_home.html";
  }

}

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.username) {
    document.getElementById("userId").value = user.username; // or user._id if you store that
  } else {
    document.getElementById("userId").value = "Guest";
  }
});

console.log("i am from front/new-ticket.js");