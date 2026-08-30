const blogForm = document.getElementById("blogForm");
const blogTitle = document.getElementById("blogTitle");
const blogContent = document.getElementById("blogContent");
const blogCategory = document.getElementById("blogCategory");

const titleCount = document.getElementById("titleCount");
const contentCount = document.getElementById("contentCount");
const blogPreview = document.getElementById("blogPreview");

const saveDraftBtn = document.getElementById("saveDraftBtn");


/* =========================
   TITLE COUNTER
========================= */

if (blogTitle) {

    blogTitle.addEventListener("input", function () {

        titleCount.textContent =
            `${blogTitle.value.length} / 120`;

        updatePreview();

    });

}


/* =========================
   CONTENT COUNTER
========================= */

if (blogContent) {

    blogContent.addEventListener("input", function () {

        contentCount.textContent =
            `${blogContent.value.length} characters`;

        updatePreview();

    });

}


/* =========================
   CATEGORY PREVIEW
========================= */

if (blogCategory) {

    blogCategory.addEventListener("change", updatePreview);

}


/* =========================
   LIVE PREVIEW
========================= */

function updatePreview() {

    const title = blogTitle.value.trim();
    const content = blogContent.value.trim();
    const category = blogCategory.value;

    if (!title && !content && !category) {

        blogPreview.innerHTML = `
            <span class="preview-placeholder">
                Your blog title and content preview
                will appear here.
            </span>
        `;

        return;
    }

    const categoryText =
        blogCategory.options[blogCategory.selectedIndex]?.text || "";

    blogPreview.innerHTML = `

        ${
            categoryText
                ? `<span class="preview-category">${categoryText}</span>`
                : ""
        }

        <h3 class="preview-title">
            ${title || "Untitled Blog"}
        </h3>

        <p class="preview-content">
            ${content || "Start writing your blog content..."}
        </p>
    `;
}


/* =========================
   SAVE DRAFT
========================= */

if (saveDraftBtn) {

    saveDraftBtn.addEventListener("click", function () {

        const title = blogTitle.value.trim();

        if (!title) {

            alert("Please enter a blog title before saving.");

            blogTitle.focus();

            return;
        }

        alert(
            "Draft saved successfully. Backend storage will be added later."
        );

    });

}


/* =========================
   PUBLISH BLOG
========================= */

if (blogForm) {

    blogForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const title = blogTitle.value.trim();
        const category = blogCategory.value;
        const content = blogContent.value.trim();

        if (!title || !category || !content) {

            alert(
                "Please complete the title, category, and content fields."
            );

            return;
        }

       fetch("http://localhost:5000/api/blog/create", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
    title: title,
    content: content,
    author: "Harish",
    category: category
})
})
.then(response => response.json())
.then(data => {
    alert(data.message || "Blog published successfully!");
})
.catch(error => {
    console.error("Error:", error);
    alert("Failed to publish blog.");
});

    });

}