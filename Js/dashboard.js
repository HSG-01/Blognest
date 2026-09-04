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


/* ==========================
   DISPLAY BLOGS IN TABLE
========================== */

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
                            ${blog.category
                                ? blog.category.substring(0, 2).toUpperCase()
                                : "BL"}
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
                    <button
                        class="action-btn"
                        onclick="viewBlog('${blog._id}')">
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


/* ==========================
   VIEW INDIVIDUAL BLOG
========================== */

function viewBlog(blogId) {

    window.location.href = `../Pages/view-blog.html?id=${blogId}`;

}


/* ==========================
   LOAD BLOGS
========================== */

displayBlogs();