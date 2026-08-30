const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");


/* =========================
   LOGIN
========================= */

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        // Check required fields
        if (!email || !password) {

            alert("Please fill in all fields.");

            return;
        }

       // Connect login form to backend API
fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        email: email,
        password: password
    })
})
.then(response => response.json())
.then(data => {
    if (data.message === "Login successful") {
        alert("Login successful! Welcome to BlogNest.");
        window.location.href = "dashboard.html";
    } else {
        alert(data.message || "Login failed.");
    }
})
.catch(error => {
    console.error("Login error:", error);
    alert("Unable to connect to the server.");
});

    });

}


/* =========================
   REGISTER
========================= */

if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const fullName =
            document.getElementById("fullName").value.trim();

        const email =
            document.getElementById("registerEmail").value.trim();

        const password =
            document.getElementById("registerPassword").value.trim();

        const confirmPassword =
            document.getElementById("confirmPassword").value.trim();

// Connect registration form to backend API
fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: fullName,
        email: email,
        password: password
    })
})
.then(response => response.json())
.then(data => {

    if (data.message === "User registered successfully") {

        const successMessage = document.createElement("p");

        successMessage.textContent =
            "Registration successful! Redirecting to login...";

        successMessage.className = "success-message";

        registerForm.appendChild(successMessage);

        registerForm.reset();

        setTimeout(function () {
            window.location.href = "login.html";
        }, 1500);

    } else {
        alert(data.message || "Registration failed.");
    }

})
.catch(error => {
    console.error("Registration error:", error);
    alert("Unable to connect to the server.");
});
            // Success message
        const successMessage = document.createElement("p");

        successMessage.textContent =
            "Registration successful! Redirecting to login...";

        successMessage.className = "success-message";

        registerForm.appendChild(successMessage);

        registerForm.reset();


        // Redirect to login page
        setTimeout(function () {

            window.location.href = "login.html";

        }, 1500);

    });

}