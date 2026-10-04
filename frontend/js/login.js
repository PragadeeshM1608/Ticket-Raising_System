document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  if (!username || !password) {
    errorMsg.textContent = "Both fields are required.";
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      errorMsg.style.color = "red";
      errorMsg.textContent = result.message || "Login failed.";
      return;
    }

    const user = result.user;

    // ✅ Store full user object in localStorage
    localStorage.setItem("user", JSON.stringify({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    }));

    errorMsg.style.color = "lightgreen";
    errorMsg.textContent = "Login successful! Redirecting...";

    // Redirect based on role
    setTimeout(() => {
      if (user.role === "admin") {
        window.location.href = "admin_dashboard.html";
      } else {
        window.location.href = "user_home.html";
      }
    }, 1500);

  } catch (err) {
    errorMsg.textContent = "Server error. Please try again.";
    console.error(err);
  }
});

console.log("i am from front/login.js");

// Optional: Debug what's in localStorage
const storedUser = JSON.parse(localStorage.getItem("user"));
console.log("Stored User Info:", storedUser);
