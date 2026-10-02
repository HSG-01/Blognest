const params =
    new URLSearchParams(window.location.search);

const blogId =
    params.get("id");


// ========================================
// LOAD INDIVIDUAL BLOG
// ========================================

async function loadBlog() {

    const container =
        document.getElementById("blogContainer");


    if (!container) {

        console.error(
            "Blog container not found."
        );

        return;

    }


    // ========================================
    // CHECK BLOG ID
    // ========================================

    if (!blogId) {

        showError(
            "Blog not found",
            "No blog ID was provided."
        );

        return;

    }


    try {

        // ========================================
        // FETCH BLOG
        // ========================================

        const response =
            await fetch(
                `http://localhost:5000/api/blog/${blogId}`
            );


        const data =
            await response.json();


        // ========================================
        // HANDLE BACKEND ERROR
        // ========================================

        if (!response.ok) {

            showError(
                data.message ||
                "Blog not found",
                "The requested blog could not be loaded."
            );

            return;

        }


        const blog =
            data.blog;


        if (!blog) {

            showError(
                "Blog not found",
                "The requested blog does not exist."
            );

            return;

        }


        // ========================================
        // DISPLAY BLOG
        // ========================================

        displayBlog(blog);


    } catch (error) {

        console.error(
            "Error loading blog:",
            error
        );


        showError(
            "Failed to load blog",
            "Please make sure the backend server is running."
        );

    }

}


// ========================================
// DISPLAY BLOG
// ========================================

function displayBlog(blog) {

    const container =
        document.getElementById("blogContainer");


    if (!container) {

        return;

    }


    const category =
        blog.category || "General";


    const author =
        blog.author || "Unknown Author";


    const date =
        blog.date || "-";


    const views =
        blog.views || 0;


    container.innerHTML = `

        <!-- Category -->

        <span class="blog-category">

            ${category}

        </span>


        <!-- Title -->

        <h1 class="blog-title">

            ${blog.title}

        </h1>


        <!-- Blog Meta -->

        <div class="blog-meta">

            <span class="meta-item">

                👤

                <span>
                    ${author}
                </span>

            </span>


            <span class="meta-dot">
                •
            </span>


            <span class="meta-item">

                📅

                <span>
                    ${date}
                </span>

            </span>


            <span class="meta-dot">
                •
            </span>


            <span class="meta-item">

                👁

                <span>
                    ${views} Views
                </span>

            </span>

        </div>


        <!-- Blog Content -->

        <div class="blog-content">

            <p>
                ${blog.content}
            </p>

        </div>


        <!-- Blog Actions -->

        <div class="blog-actions">


            <div class="action-left">

                <a
                    href="create-blog.html?id=${blog._id}"
                    class="action-button edit-button"
                >
                    ✏️ Edit Blog
                </a>


                <button
                    class="action-button delete-button"
                    onclick="deleteBlog('${blog._id}')"
                >
                    🗑️ Delete Blog
                </button>

            </div>


            <a
                href="dashboard.html"
                class="action-button dashboard-button"
            >
                Back to Dashboard
            </a>


        </div>

    `;

}


// ========================================
// DELETE BLOG
// ========================================

// ========================================
// DELETE BLOG
// ========================================

async function deleteBlog(blogId) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this blog?"
        );


    if (!confirmed) {

        return;

    }


    // ========================================
    // GET JWT TOKEN
    // ========================================

    const token =
        localStorage.getItem("token");


    if (!token) {

        alert(
            "Please login to delete this blog."
        );

        window.location.href =
            "login.html";

        return;

    }


    try {

        const response =
            await fetch(
                `http://localhost:5000/api/blog/${blogId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
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


        window.location.href =
            "dashboard.html";


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


// ========================================
// ERROR DISPLAY
// ========================================

function showError(title, message) {

    const container =
        document.getElementById("blogContainer");


    if (!container) {

        return;

    }


    container.innerHTML = `

        <div class="error-state">

            <h2>
                ${title}
            </h2>

            <p>
                ${message}
            </p>

            <a
                href="dashboard.html"
                class="action-button dashboard-button"
            >
                ← Back to Dashboard
            </a>

        </div>

    `;

}


// ========================================
// LOAD BLOG WHEN PAGE OPENS
// ========================================

loadBlog();