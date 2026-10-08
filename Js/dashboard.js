// ======================================================
// BLOGNEST DASHBOARD
// ======================================================


// ======================================================
// AUTHENTICATION CHECK
// ======================================================

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}


// ======================================================
// CURRENT USER
// ======================================================

let currentUser = null;

try {
    const userData = localStorage.getItem("user");

    if (userData) {
        currentUser = JSON.parse(userData);
    }
} catch (error) {
    console.error("Error loading current user:", error);
}


// ======================================================
// DASHBOARD ELEMENTS
// ======================================================

const sidebar = document.getElementById("sidebar");

const openSidebar =
    document.getElementById("openSidebar");

const closeSidebar =
    document.getElementById("closeSidebar");

const searchBlog =
    document.getElementById("searchBlog");

const categoryFilter =
    document.getElementById("categoryFilter");


// ======================================================
// BLOG DATA
// ======================================================

let allBlogs = [];

let currentView = "dashboard";


// ======================================================
// DYNAMIC WELCOME MESSAGE
// ======================================================

function loadWelcomeMessage() {

    const welcomeMessage =
        document.getElementById("welcomeMessage");

    if (!welcomeMessage) {
        return;
    }

    if (!currentUser) {

        welcomeMessage.textContent =
            "Welcome back! 👋";

        return;
    }

    const name =
        currentUser.name || "User";

    welcomeMessage.textContent =
        `Welcome back, ${name}! 👋`;
}

loadWelcomeMessage();


// ======================================================
// SIDEBAR OPEN
// ======================================================

if (openSidebar) {

    openSidebar.addEventListener("click", function () {

        if (sidebar) {
            sidebar.classList.add("open");
        }

    });

}


// ======================================================
// SIDEBAR CLOSE
// ======================================================

if (closeSidebar) {

    closeSidebar.addEventListener("click", function () {

        if (sidebar) {
            sidebar.classList.remove("open");
        }

    });

}


// ======================================================
// GET CURRENT VIEW FROM URL
// ======================================================

function getCurrentView() {

    const params =
        new URLSearchParams(window.location.search);

    const view =
        params.get("view");

    if (view === "my-blogs") {
        return "my-blogs";
    }

    if (view === "blogs") {
        return "blogs";
    }

    return "dashboard";
}


// ======================================================
// SET ACTIVE SIDEBAR LINK
// ======================================================

function setActiveSidebar() {

    const view = currentView;

    const sidebarLinks =
        document.querySelectorAll(".sidebar-link");

    sidebarLinks.forEach(function (link) {

        link.classList.remove("active");

    });


    sidebarLinks.forEach(function (link) {

        const href =
            link.getAttribute("href");

        if (!href) {
            return;
        }


        if (
            view === "dashboard" &&
            (
                href === "dashboard.html" ||
                href === "dashboard.html?view=dashboard"
            )
        ) {

            link.classList.add("active");

        }


        if (
            view === "my-blogs" &&
            href === "dashboard.html?view=my-blogs"
        ) {

            link.classList.add("active");

        }


        if (
            view === "blogs" &&
            href === "dashboard.html?view=blogs"
        ) {

            link.classList.add("active");

        }

    });

}


// ======================================================
// UPDATE PAGE TEXT
// ======================================================

function updatePageInformation() {

    const pageTitle =
        document.getElementById("pageTitle");

    const pageDescription =
        document.getElementById("pageDescription");

    const contentHeading =
        document.getElementById("contentHeading");

    const viewAllLink =
        document.getElementById("viewAllLink");

    const welcomeSection =
        document.getElementById("welcomeSection");


    // ------------------------------------------
    // DASHBOARD
    // ------------------------------------------

    if (currentView === "dashboard") {

        if (pageTitle) {
            pageTitle.textContent = "Dashboard";
        }

        if (pageDescription) {
            pageDescription.textContent =
                "View the blogs you have explored and continue discovering new ideas.";
        }

        if (contentHeading) {
            contentHeading.textContent =
                "Viewed Blogs";
        }

        if (viewAllLink) {
            viewAllLink.textContent =
                "View All Blogs →";

            viewAllLink.href =
                "dashboard.html?view=blogs";
        }

        if (welcomeSection) {
            welcomeSection.style.display = "";
        }

    }


    // ------------------------------------------
    // MY BLOGS
    // ------------------------------------------

    if (currentView === "my-blogs") {

        if (pageTitle) {
            pageTitle.textContent = "My Blogs";
        }

        if (pageDescription) {
            pageDescription.textContent =
                "Manage the blogs you have created and published.";
        }

        if (contentHeading) {
            contentHeading.textContent =
                "My Blogs";
        }

        if (viewAllLink) {
            viewAllLink.textContent =
                "View All Blogs →";

            viewAllLink.href =
                "dashboard.html?view=blogs";
        }

        if (welcomeSection) {
            welcomeSection.style.display = "";
        }

    }


    // ------------------------------------------
    // ALL BLOGS
    // ------------------------------------------

    if (currentView === "blogs") {

        if (pageTitle) {
            pageTitle.textContent = "Blogs";
        }

        if (pageDescription) {
            pageDescription.textContent =
                "Explore all blogs available in the BlogNest community.";
        }

        if (contentHeading) {
            contentHeading.textContent =
                "All Blogs";
        }

        if (viewAllLink) {
            viewAllLink.textContent =
                "My Blogs →";

            viewAllLink.href =
                "dashboard.html?view=my-blogs";
        }

        if (welcomeSection) {
            welcomeSection.style.display = "";
        }

    }

}


// ======================================================
// FETCH ALL BLOGS
// ======================================================

async function fetchAllBlogs() {

    try {

        const response = await fetch(
            "https://blognest-zeta.vercel.appp/api/blog",
            {
                method: "GET",

                headers: {
                    "Authorization":
                        `Bearer ${token}`
                }
            }
        );


        const data =
            await response.json();


        if (!response.ok) {

            console.error(
                data.message ||
                "Failed to fetch blogs."
            );

            return [];

        }


        return data.blogs || [];


    } catch (error) {

        console.error(
            "Fetch all blogs error:",
            error
        );

        return [];

    }

}


// ======================================================
// FETCH VIEWED BLOGS
// ======================================================

async function fetchViewedBlogs() {

    try {

        const response = await fetch(
            "https://blognest-zeta.vercel.appp/api/blog/viewed/me",
            {
                method: "GET",

                headers: {
                    "Authorization":
                        `Bearer ${token}`
                }
            }
        );


        const data =
            await response.json();


        if (!response.ok) {

            console.error(
                data.message ||
                "Failed to fetch viewed blogs."
            );

            return [];

        }


        return data.blogs || [];


    } catch (error) {

        console.error(
            "Fetch viewed blogs error:",
            error
        );

        return [];

    }

}


// ======================================================
// CHECK BLOG OWNER
// ======================================================

function isBlogOwner(blog) {

    if (!currentUser) {
        return false;
    }

    if (!blog || !blog.userId) {
        return false;
    }


    const currentUserId =
        String(
            currentUser._id ||
            currentUser.id ||
            ""
        );


    const blogUserId =
        typeof blog.userId === "object"
            ? String(
                blog.userId._id ||
                blog.userId.id ||
                ""
            )
            : String(blog.userId);


    return (
        currentUserId !== "" &&
        blogUserId !== "" &&
        currentUserId === blogUserId
    );

}


// ======================================================
// LOAD DASHBOARD DATA
// ======================================================

async function loadDashboardData() {

    try {

        // ------------------------------------------
        // ALWAYS FETCH ALL BLOGS FIRST
        // ------------------------------------------

        const allBlogsFromServer =
            await fetchAllBlogs();


        // ------------------------------------------
        // STORE ALL BLOGS
        // ------------------------------------------

        allBlogs = allBlogsFromServer;


        // ------------------------------------------
        // DASHBOARD = VIEWED BLOGS
        // ------------------------------------------

        if (currentView === "dashboard") {

            const viewedBlogs =
                await fetchViewedBlogs();

            allBlogs =
                viewedBlogs;
        }


        // ------------------------------------------
        // MY BLOGS
        // ------------------------------------------

        else if (currentView === "my-blogs") {

            if (!currentUser) {

                allBlogs = [];

            } else {

                const currentUserId =
                    String(
                        currentUser._id ||
                        currentUser.id ||
                        ""
                    );


                allBlogs =
                    allBlogsFromServer.filter(
                        function (blog) {

                            if (!blog.userId) {
                                return false;
                            }


                            const blogUserId =
                                typeof blog.userId === "object"
                                    ? String(
                                        blog.userId._id ||
                                        blog.userId.id ||
                                        ""
                                    )
                                    : String(blog.userId);


                            return (
                                blogUserId ===
                                currentUserId
                            );

                        }
                    );
            }

        }


        // ------------------------------------------
        // ALL BLOGS
        // ------------------------------------------

        else if (currentView === "blogs") {

            allBlogs =
                allBlogsFromServer;

        }


        // ------------------------------------------
        // UPDATE STATISTICS
        // ------------------------------------------

        updateDashboardStats();


        // ------------------------------------------
        // RENDER BLOGS
        // ------------------------------------------

        applyFilters();


    } catch (error) {

        console.error(
            "Load dashboard data error:",
            error
        );

        renderBlogs([]);

    }

}


// ======================================================
// APPLY SEARCH + CATEGORY FILTER
// ======================================================

function applyFilters() {

    const searchText =
        searchBlog
            ? searchBlog.value
                .toLowerCase()
                .trim()
            : "";


    const selectedCategory =
        categoryFilter
            ? categoryFilter.value
            : "all";


    const filteredBlogs =
        allBlogs.filter(
            function (blog) {

                const title =
                    (blog.title || "")
                        .toLowerCase();


                const content =
                    (blog.content || "")
                        .toLowerCase();


                const category =
                    (blog.category || "general")
                        .toLowerCase();


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

            }
        );


    renderBlogs(filteredBlogs);

}


// ======================================================
// SEARCH FILTER
// ======================================================

function filterBlogs() {

    applyFilters();

}


if (searchBlog) {

    searchBlog.addEventListener(
        "input",
        filterBlogs
    );

}


// ======================================================
// CATEGORY FILTER
// ======================================================

if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        filterBlogs
    );

}


// ======================================================
// RENDER BLOGS
// ======================================================

function renderBlogs(blogs) {

    const tableBody =
        document.getElementById(
            "recentBlogsBody"
        );


    if (!tableBody) {

        console.error(
            "Blog table body not found."
        );

        return;

    }


    tableBody.innerHTML = "";


    // ------------------------------------------
    // NO BLOGS
    // ------------------------------------------

    if (!blogs || blogs.length === 0) {

        let message =
            "No blogs found.";


        if (currentView === "dashboard") {

            message =
                "You haven't viewed any blogs yet.";

        }


        if (currentView === "my-blogs") {

            message =
                "You haven't created any blogs yet.";

        }


        if (currentView === "blogs") {

            message =
                "No blogs are available.";

        }


        tableBody.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    style="
                        text-align:center;
                        padding:30px;
                    "
                >

                    ${message}

                </td>

            </tr>

        `;

        return;

    }


    // ------------------------------------------
    // RENDER EACH BLOG
    // ------------------------------------------

    blogs.forEach(function (blog) {

        const row =
            document.createElement("tr");


        const category =
            blog.category ||
            "General";


        const status =
            blog.status ||
            "Published";


        const date =
            blog.date ||
            "-";


        const views =
            Number(blog.views) ||
            0;


        const blogId =
            blog._id;


        const owner =
            isBlogOwner(blog);


        // --------------------------------------
        // ACTION BUTTONS
        // --------------------------------------

        let actionButtons = `

            <button
                class="action-btn view-action"
                onclick="viewBlog('${blogId}')"
            >
                View
            </button>

        `;


        // --------------------------------------
        // OWNER-ONLY EDIT + DELETE
        // --------------------------------------

        if (owner) {

            actionButtons += `

                <button
                    class="action-btn edit-action"
                    onclick="editBlog('${blogId}')"
                >
                    Edit
                </button>

                <button
                    class="action-btn delete-action"
                    onclick="deleteBlog('${blogId}')"
                >
                    Delete
                </button>

            `;

        }


        // --------------------------------------
        // BLOG ROW
        // --------------------------------------

        row.innerHTML = `

            <td>

                <div class="blog-title-cell">

                    <div class="mini-thumbnail purple-bg">

                        ${
                            category
                                .substring(0, 2)
                                .toUpperCase()
                        }

                    </div>


                    <div>

                        <strong>
                            ${escapeHtml(blog.title || "Untitled Blog")}
                        </strong>

                        <span>
                            ${escapeHtml(category)}
                        </span>

                    </div>

                </div>

            </td>


            <td>

                <span
                    class="status ${
                        status.toLowerCase() === "draft"
                            ? "draft"
                            : "published"
                    }"
                >

                    ${escapeHtml(status)}

                </span>

            </td>


            <td>

                ${escapeHtml(String(date))}

            </td>


            <td>

                ${views}

            </td>


            <td>

                <div class="blog-actions">

                    ${actionButtons}

                </div>

            </td>

        `;


        tableBody.appendChild(row);

    });

}


// ======================================================
// ESCAPE HTML
// ======================================================

function escapeHtml(value) {

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


// ======================================================
// VIEW BLOG
// ======================================================

function viewBlog(blogId) {

    window.location.href =
        `../Pages/view-blog.html?id=${blogId}`;

}


// ======================================================
// EDIT BLOG
// ======================================================

function editBlog(blogId) {

    window.location.href =
        `../Pages/create-blog.html?id=${blogId}`;

}


// ======================================================
// DELETE BLOG
// ======================================================

async function deleteBlog(blogId) {

    const confirmation =
        confirm(
            "Are you sure you want to delete this blog?"
        );


    if (!confirmation) {
        return;
    }


    try {

        const response =
            await fetch(
                `https://blognest-zeta.vercel.appp/api/blog/${blogId}`,
                {
                    method: "DELETE",

                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
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


        // Reload current view
        await loadDashboardData();


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


// ======================================================
// UPDATE DASHBOARD STATISTICS
// ======================================================

function updateDashboardStats() {

    const totalBlogs =
        allBlogs.length;


    const publishedBlogs =
        allBlogs.filter(
            function (blog) {

                return (
                    (blog.status || "")
                        .toLowerCase() ===
                    "published"
                );

            }
        ).length;


    const draftBlogs =
        allBlogs.filter(
            function (blog) {

                return (
                    (blog.status || "")
                        .toLowerCase() ===
                    "draft"
                );

            }
        ).length;


    const totalViews =
        allBlogs.reduce(
            function (total, blog) {

                return (
                    total +
                    (Number(blog.views) || 0)
                );

            },
            0
        );


    // ------------------------------------------
    // UPDATE HTML
    // ------------------------------------------

    const totalBlogsElement =
        document.getElementById(
            "totalBlogs"
        );


    const publishedBlogsElement =
        document.getElementById(
            "publishedBlogs"
        );


    const draftBlogsElement =
        document.getElementById(
            "draftBlogs"
        );


    const totalViewsElement =
        document.getElementById(
            "totalViews"
        );


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


// ======================================================
// LOGOUT
// ======================================================

function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href =
        "login.html";

}


// ======================================================
// INITIALIZE DASHBOARD
// ======================================================

currentView =
    getCurrentView();


setActiveSidebar();


updatePageInformation();


loadDashboardData();