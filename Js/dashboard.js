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
// ==========================
// LOAD BLOGS FROM BACKEND
// ==========================

async function loadBlogs() {

    try {

        const response = await fetch("http://localhost:5000/api/blog");

        const data = await response.json();

        console.log("Blogs received from backend:", data);

    } catch (error) {

        console.error("Error loading blogs:", error);

    }
}


// Load blogs when dashboard opens
loadBlogs();
// ==========================
// DISPLAY BLOGS IN TABLE
// ==========================

async function displayBlogs() {

    try {

        const response = await fetch("http://localhost:5000/api/blog");

        const data = await response.json();

        const blogs = data.blogs || [];

        const tableBody = document.getElementById("recentBlogsBody");

        if (!tableBody) {
            console.error("Recent blogs table not found.");
            return;
        }

        tableBody.innerHTML = "";

        if (blogs.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align:center;">
                        No blogs found.
                    </td>
                </tr>
            `;

            return;
        }

        blogs.forEach(function (blog) {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>
                    <div class="blog-title-cell">
                        <div class="mini-thumbnail purple-bg">
                            ${blog.category ? blog.category.substring(0, 2).toUpperCase() : "BL"}
                        </div>

                        <div>
                            <strong>${blog.title}</strong>
                            <span>${blog.category || "General"}</span>
                        </div>
                    </div>
                </td>

                <td>
                    <span class="status published">
                        ${blog.status || "Published"}
                    </span>
                </td>

                <td>
                    ${blog.date || "-"}
                </td>

                <td>
                    ${blog.views || 0}
                </td>

                <td>
                   <button class="action-btn" onclick="viewBlog(${blog.id})">
                        View
                    </button>
                </td>
            `;

            tableBody.appendChild(row);

        });

    } catch (error) {

        console.error("Error displaying blogs:", error);

    }
}


// Load blogs into dashboard table
displayBlogs();

function viewBlog(blogId) {
    window.location.href = `../pages/view-blog.html?id=${blogId}`;
}