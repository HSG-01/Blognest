const params = new URLSearchParams(window.location.search);
const blogId = Number(params.get("id"));

async function loadBlog() {
    try {
        const response = await fetch("http://localhost:5000/api/blog");
        const data = await response.json();

        const blog = data.blogs.find(function (item) {
            return item.id === blogId;
        });

        const container = document.getElementById("blogContainer");

        if (!blog) {
            container.innerHTML = "<h2>Blog not found</h2>";
            return;
        }

        container.innerHTML = `
            <h2>${blog.title}</h2>
            <p><strong>Category:</strong> ${blog.category || "General"}</p>
            <p><strong>Author:</strong> ${blog.author}</p>
            <p><strong>Date:</strong> ${blog.date}</p>
            <hr>
            <p>${blog.content}</p>
        `;

    } catch (error) {
        console.error("Error loading blog:", error);

        document.getElementById("blogContainer").innerHTML =
            "<h2>Failed to load blog</h2>";
    }
}

loadBlog();