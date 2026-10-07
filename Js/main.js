// ========================================
// BLOGNEST LANDING PAGE
// ========================================

console.log("BlogNest Home Page loaded successfully!");


// ========================================
// DARK / LIGHT MODE
// ========================================

const themeToggle =
    document.getElementById("themeToggle");

const savedTheme =
    localStorage.getItem("blogNestTheme");


// Apply saved theme
if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}


// Update toggle button text
function updateThemeButton() {

    if (!themeToggle) {
        return;
    }

    if (document.body.classList.contains("dark-mode")) {

        themeToggle.textContent = "☀️ Light";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

    } else {

        themeToggle.textContent = "🌙 Dark";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );
    }
}


// Toggle theme
if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "dark-mode"
            );

            const isDark =
                document.body.classList.contains(
                    "dark-mode"
                );

            localStorage.setItem(
                "blogNestTheme",
                isDark ? "dark" : "light"
            );

            updateThemeButton();
        }
    );
}


// Set correct button text when page loads
updateThemeButton();