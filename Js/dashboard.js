const sidebar = document.getElementById("sidebar");
const openSidebar = document.getElementById("openSidebar");
const closeSidebar = document.getElementById("closeSidebar");
let allBlogs = [];

const searchBlog =
    document.getElementById("searchBlog");

const categoryFilter =
    document.getElementById("categoryFilter");


// =========================
// OPEN SIDEBAR
// =========================

if (openSidebar) {

    openSidebar.addEventListener("click", function () {

        sidebar.classList.add("open");

    });

}


// =========================
// CLOSE SIDEBAR
// =========================

if (closeSidebar) {

    closeSidebar.addEventListener("click", function () {

        sidebar.classList.remove("open");

    });

}


// =========================
// DISPLAY BLOGS IN TABLE
// =========================

async function displayBlogs() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/blog"
        );

        const data = await response.json();

        allBlogs = data.blogs || [];

        const blogs = allBlogs;
        // =========================
// UPDATE DASHBOARD STATS
// =========================

updateDashboardStats();


        const tableBody =
            document.getElementById("recentBlogsBody");

        if (!tableBody) {

            console.error(
                "Recent blogs table not found."
            );

            return;

        }

        tableBody.innerHTML = "";


        // No blogs
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


        // Render blogs
        // Display blogs
renderBlogs(blogs);

    } catch (error) {

        console.error(
            "Error displaying blogs:",
            error
        );

    }

}


// =========================
// VIEW BLOG
// =========================

function viewBlog(blogId) {

    window.location.href =
        `../Pages/view-blog.html?id=${blogId}`;

}


// =========================
// EDIT BLOG
// =========================

function editBlog(blogId) {

    window.location.href =
        `../Pages/create-blog.html?id=${blogId}`;

}


// =========================
// DELETE BLOG
// =========================

async function deleteBlog(blogId) {

    const confirmation =
        confirm(
            "Are you sure you want to delete this blog?"
        );


    if (!confirmation) {

        return;

    }


    try {

        const response = await fetch(
            `http://localhost:5000/api/blog/${blogId}`,
            {
                method: "DELETE"
            }
        );


        const data =
            await response.json();


        if (!response.ok) {

            alert(
                data.message ||
                "Failed to delete blog."
            );

            return;

        }


        alert(
            data.message ||
            "Blog deleted successfully!"
        );


        // Refresh table
        displayBlogs();


    } catch (error) {

        console.error(
            "Delete blog error:",
            error
        );


        alert(
            "Failed to delete blog."
        );

    }

}


// =========================
// SEARCH & CATEGORY FILTER
// =========================

function filterBlogs() {

    const searchText =
        searchBlog
            ? searchBlog.value.toLowerCase().trim()
            : "";

    const selectedCategory =
        categoryFilter
            ? categoryFilter.value
            : "all";


    const filteredBlogs =
        allBlogs.filter(function (blog) {

            const title =
                (blog.title || "").toLowerCase();

            const content =
                (blog.content || "").toLowerCase();

            const category =
                (blog.category || "general").toLowerCase();


            const matchesSearch =
                title.includes(searchText) ||
                content.includes(searchText);


            const matchesCategory =
                selectedCategory === "all" ||
                category === selectedCategory;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    renderBlogs(filteredBlogs);

}


// =========================
// RENDER BLOGS
// =========================

function renderBlogs(blogs) {

    const tableBody =
        document.getElementById("recentBlogsBody");


    if (!tableBody) {

        return;

    }


    tableBody.innerHTML = "";


    if (blogs.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td
                    colspan="5"
                    style="text-align:center; padding:30px;"
                >
                    No blogs found.
                </td>
            </tr>
        `;

        return;

    }


    blogs.forEach(function (blog) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>

                <div class="blog-title-cell">

                    <div class="mini-thumbnail purple-bg">

                        ${
                            blog.category
                                ? blog.category
                                    .substring(0, 2)
                                    .toUpperCase()
                                : "BL"
                        }

                    </div>


                    <div>

                        <strong>
                            ${blog.title}
                        </strong>

                        <span>
                            ${blog.category || "General"}
                        </span>

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

                <div class="blog-actions">

                    <button
                        class="action-btn view-action"
                        onclick="viewBlog('${blog._id}')">

                        View

                    </button>


                    <button
                        class="action-btn edit-action"
                        onclick="editBlog('${blog._id}')">

                        Edit

                    </button>


                    <button
                        class="action-btn delete-action"
                        onclick="deleteBlog('${blog._id}')">

                        Delete

                    </button>

                </div>

            </td>

        `;


        tableBody.appendChild(row);

    });

}

// =========================
// SEARCH EVENT
// =========================

if (searchBlog) {

    searchBlog.addEventListener(
        "input",
        filterBlogs
    );

}


// =========================
// CATEGORY EVENT
// =========================

if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        filterBlogs
    );

}

// =========================
// UPDATE DASHBOARD STATS
// =========================

function updateDashboardStats() {

    const totalBlogs =
        allBlogs.length;


    const publishedBlogs =
        allBlogs.filter(function (blog) {

            return (
                (blog.status || "")
                    .toLowerCase() === "published"
            );

        }).length;


    const draftBlogs =
        allBlogs.filter(function (blog) {

            return (
                (blog.status || "")
                    .toLowerCase() === "draft"
            );

        }).length;


    const totalViews =
        allBlogs.reduce(function (total, blog) {

            return total + (Number(blog.views) || 0);

        }, 0);


    // Display statistics

    const totalBlogsElement =
        document.getElementById("totalBlogs");

    const publishedBlogsElement =
        document.getElementById("publishedBlogs");

    const draftBlogsElement =
        document.getElementById("draftBlogs");

    const totalViewsElement =
        document.getElementById("totalViews");


    if (totalBlogsElement) {

        totalBlogsElement.textContent =
            totalBlogs;

    }


    if (publishedBlogsElement) {

        publishedBlogsElement.textContent =
            publishedBlogs;

    }


    if (draftBlogsElement) {

        draftBlogsElement.textContent =
            draftBlogs;

    }


    if (totalViewsElement) {

        totalViewsElement.textContent =
            totalViews.toLocaleString();

    }

}

// =========================
// LOAD BLOGS
// =========================

displayBlogs();