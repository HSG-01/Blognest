// ========================================
// CHECK LOGIN
// ========================================

const token =
    localStorage.getItem("token");


if (!token) {

    window.location.href =
        "login.html";

}


// ========================================
// LOAD USER PROFILE
// ========================================

function loadProfile() {

    const userData =
        localStorage.getItem("user");


    if (!userData) {

        alert(
            "User information not found. Please login again."
        );

        localStorage.removeItem("token");

        window.location.href =
            "login.html";

        return;

    }


    try {

        const user =
            JSON.parse(userData);


        // ========================================
        // USER INFORMATION
        // ========================================

        const name =
            user.name || "User";


        const email =
            user.email || "No email available";


        // ========================================
        // DISPLAY PROFILE
        // ========================================

        const profileName =
            document.getElementById("profileName");


        const profileEmail =
            document.getElementById("profileEmail");


        const profileNameInput =
            document.getElementById("profileNameInput");


        const profileEmailInput =
            document.getElementById("profileEmailInput");


        if (profileName) {

            profileName.textContent =
                name;

        }


        if (profileEmail) {

            profileEmail.textContent =
                email;

        }


        if (profileNameInput) {

            profileNameInput.value =
                name;

        }


        if (profileEmailInput) {

            profileEmailInput.value =
                email;

        }


    } catch (error) {

        console.error(
            "Error loading profile:",
            error
        );


        alert(
            "Unable to load profile information."
        );

    }

}


// ========================================
// LOAD PROFILE WHEN PAGE OPENS
// ========================================

loadProfile();

// ========================================
// LOGOUT
// ========================================

function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "login.html";
}