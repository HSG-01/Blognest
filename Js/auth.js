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
        fetch("https://blognest-zeta.vercel.appp/api/auth/login", {
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

                // Store JWT token
                localStorage.setItem("token", data.token);

                // Store logged-in user information
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                alert("Login successful! Welcome to BlogNest.");

                // Redirect to dashboard
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

        // Check required fields
        if (!fullName || !email || !password || !confirmPassword) {
            alert("Please fill in all fields.");
            return;
        }

        // Check password confirmation
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // Connect registration form to backend API
        fetch("https://blognest-zeta.vercel.appp/api/auth/register", {
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

    });

}