const params = new URLSearchParams(window.location.search);
const blogId = params.get("id");


// ==============================
// LOAD INDIVIDUAL BLOG
// ==============================

async function loadBlog() {

    const container = document.getElementById("blogContainer");

    if (!container) {
        console.error("Blog container not found.");
        return;
    }

    // Check if blog ID exists
    if (!blogId) {
        container.innerHTML = "<h2>Blog not found</h2>";
        return;
    }

    try {

        // Fetch individual blog from backend
        const response = await fetch(
            `http://localhost:5000/api/blog/${blogId}`
        );

        const data = await response.json();

        // Handle backend error
        if (!response.ok) {
            container.innerHTML = `
                <h2>${data.message || "Blog not found"}</h2>
            `;
            return;
        }

        const blog = data.blog;

        if (!blog) {
            container.innerHTML = "<h2>Blog not found</h2>";
            return;
        }


        // Display blog
        container.innerHTML = `
            <h2>${blog.title}</h2>

            <p>
                <strong>Category:</strong>
                ${blog.category || "General"}
            </p>

            <p>
                <strong>Author:</strong>
                ${blog.author}
            </p>

            <p>
                <strong>Date:</strong>
                ${blog.date || "-"}
            </p>

            <p>
                <strong>Views:</strong>
                ${blog.views || 0}
            </p>

            <hr>

            <p>${blog.content}</p>
        `;

    } catch (error) {

        console.error("Error loading blog:", error);

        container.innerHTML = `
            <h2>Failed to load blog</h2>
            <p>Please make sure the backend server is running.</p>
        `;
    }
}


// Load blog when page opens
loadBlog();