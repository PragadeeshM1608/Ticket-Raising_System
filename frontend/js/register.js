document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  if (!name || !username || !password || !confirmPassword) {
    errorMsg.textContent = "All fields are required.";
    return;
  }

  if (password !== confirmPassword) {
    errorMsg.textContent = "Passwords do not match.";
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, username, password, confirmPassword }),
    });

    const result = await response.json();

    if (!response.ok) {
      errorMsg.textContent = result.message || "Registration failed.";
    } else {
      errorMsg.style.color = "lightgreen";
      errorMsg.textContent = "Registration successful! Redirecting...";
      setTimeout(() => {
        window.location.href = "login.html";
      }, 2000);
    }
  } catch (err) {
    errorMsg.textContent = "Server error. Please try again.";
    console.error(err);
  }
});

console.log("i am from front/register.js");