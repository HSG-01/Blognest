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

        // Frontend-only login
        alert("Login successful! Welcome to BlogNest.");

        // Go to dashboard
        window.location.href = "dashboard.html";

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


        // Check password match
        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;
        }


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