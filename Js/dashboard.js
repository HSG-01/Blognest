const sidebar = document.getElementById("sidebar");
const openSidebar = document.getElementById("openSidebar");
const closeSidebar = document.getElementById("closeSidebar");


/* =========================
   OPEN SIDEBAR
========================= */

if (openSidebar) {
    openSidebar.addEventListener("click", function () {
        sidebar.classList.add("open");
    });
}


/* =========================
   CLOSE SIDEBAR
========================= */

if (closeSidebar) {
    closeSidebar.addEventListener("click", function () {
        sidebar.classList.remove("open");
    });
}


/* =========================
   ACTION BUTTONS
========================= */

const actionButtons = document.querySelectorAll(".action-btn");

actionButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        alert(
            "This action will be connected to the backend in a later module."
        );

    });

});