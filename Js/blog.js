console.log("BLOG JS LOADED");

// ========================================
// GET FORM ELEMENTS
// ========================================

const blogForm = document.getElementById("blogForm");

const blogTitle = document.getElementById("blogTitle");

const blogContent = document.getElementById("blogContent");

const blogCategory = document.getElementById("blogCategory");

const titleCount = document.getElementById("titleCount");

const contentCount = document.getElementById("contentCount");

const blogPreview = document.getElementById("blogPreview");

const saveDraftBtn = document.getElementById("saveDraftBtn");


// ========================================
// AUTHENTICATION CHECK
// ========================================

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}


// ========================================
// CHECK WHETHER THIS IS CREATE OR EDIT MODE
// ========================================

const urlParams =
    new URLSearchParams(window.location.search);

const editBlogId =
    urlParams.get("id");

const isEditMode =
    Boolean(editBlogId);

console.log("EDIT BLOG ID:", editBlogId);

console.log("EDIT MODE:", isEditMode);


// ========================================
// CHANGE PAGE TEXT IN EDIT MODE
// ========================================

if (isEditMode) {

    const pageTitle =
        document.querySelector(".topbar-title");

    const welcomeLabel =
        document.querySelector(".welcome-label");

    const welcomeTitle =
        document.querySelector(".welcome-section h1");

    const submitButton =
        document.querySelector(".primary-editor-btn");

    if (pageTitle) {
        pageTitle.textContent = "Edit Blog";
    }

    if (welcomeLabel) {
        welcomeLabel.textContent = "EDIT CONTENT";
    }

    if (welcomeTitle) {
        welcomeTitle.textContent = "Edit Your Blog";
    }

    if (submitButton) {
        submitButton.textContent = "Update Blog";
    }

    // Load existing blog
    loadBlogForEditing();
}


// ========================================
// LOAD EXISTING BLOG
// ========================================

async function loadBlogForEditing() {

    console.log(
        "Loading blog:",
        editBlogId
    );

    try {

        const response = await fetch(
            `https://blognest-zeta.vercel.app/api/blog/${editBlogId}`
        );

        const data =
            await response.json();

        console.log(
            "Blog API response:",
            data
        );

        if (!response.ok) {

            alert(
                data.message ||
                "Failed to load blog."
            );

            return;
        }

        const blog =
            data.blog;

        // Fill existing title
        if (blogTitle) {

            blogTitle.value =
                blog.title || "";

        }

        // Fill existing content
        if (blogContent) {

            blogContent.value =
                blog.content || "";

        }

        // Fill existing category
        if (blogCategory) {

            blogCategory.value =
                blog.category || "";

        }

        // Update counters
        updateCounters();

        // Update preview
        updatePreview();

        console.log(
            "Existing blog loaded successfully."
        );

    } catch (error) {

        console.error(
            "Error loading blog:",
            error
        );

        alert(
            "Failed to load blog for editing."
        );

    }

}


// ========================================
// TITLE COUNTER
// ========================================

if (blogTitle) {

    blogTitle.addEventListener(
        "input",
        function () {

            updateCounters();

            updatePreview();

        }
    );

}


// ========================================
// CONTENT COUNTER
// ========================================

if (blogContent) {

    blogContent.addEventListener(
        "input",
        function () {

            updateCounters();

            updatePreview();

        }
    );

}


// ========================================
// CATEGORY CHANGE
// ========================================

if (blogCategory) {

    blogCategory.addEventListener(
        "change",
        updatePreview
    );

}


// ========================================
// UPDATE COUNTERS
// ========================================

function updateCounters() {

    if (titleCount && blogTitle) {

        titleCount.textContent =
            `${blogTitle.value.length} / 120`;

    }

    if (contentCount && blogContent) {

        contentCount.textContent =
            `${blogContent.value.length} characters`;

    }

}


// ========================================
// LIVE PREVIEW
// ========================================

function updatePreview() {

    if (
        !blogTitle ||
        !blogContent ||
        !blogCategory ||
        !blogPreview
    ) {

        return;

    }

    const title =
        blogTitle.value.trim();

    const content =
        blogContent.value.trim();

    const category =
        blogCategory.value;

    if (
        !title &&
        !content &&
        !category
    ) {

        blogPreview.innerHTML = `
            <span class="preview-placeholder">
                Your blog title and content preview
                will appear here.
            </span>
        `;

        return;
    }

    const categoryText =
        blogCategory.options[
            blogCategory.selectedIndex
        ]?.text || "";

    blogPreview.innerHTML = `

        ${
            categoryText
                ? `
                    <span class="preview-category">
                        ${categoryText}
                    </span>
                `
                : ""
        }

        <h3 class="preview-title">
            ${title || "Untitled Blog"}
        </h3>

        <p class="preview-content">
            ${content ||
            "Start writing your blog content..."}
        </p>

    `;

}


// ========================================
// SAVE DRAFT
// ========================================

if (saveDraftBtn) {

    saveDraftBtn.addEventListener(
        "click",
        function () {

            const title =
                blogTitle.value.trim();

            if (!title) {

                alert(
                    "Please enter a blog title before saving."
                );

                blogTitle.focus();

                return;
            }

            alert(
                "Draft functionality is not connected to the database yet."
            );

        }
    );

}


// ========================================
// CREATE OR UPDATE BLOG
// ========================================

if (blogForm) {

    blogForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const title =
                blogTitle.value.trim();

            const category =
                blogCategory.value;

            const content =
                blogContent.value.trim();

            // Validate fields
            if (
                !title ||
                !category ||
                !content
            ) {

                alert(
                    "Please complete the title, category, and content fields."
                );

                return;
            }


            // ========================================
            // EDIT MODE → UPDATE BLOG
            // ========================================

            if (isEditMode) {

                console.log(
                    "Updating blog:",
                    editBlogId
                );

                try {

                    const response =
                        await fetch(
                            `https://blognest-zeta.vercel.app/api/blog/${editBlogId}`,
                            {
                                method: "PUT",

                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${token}`
                                },

                                body: JSON.stringify({

                                    title: title,

                                    content: content,

                                    category: category

                                })

                            }
                        );

                    const data =
                        await response.json();

                    console.log(
                        "Update response:",
                        data
                    );

                    if (!response.ok) {

                        alert(
                            data.message ||
                            "Failed to update blog."
                        );

                        return;

                    }

                    alert(
                        data.message ||
                        "Blog updated successfully!"
                    );

                    // Go back to dashboard
                    window.location.href =
                        "dashboard.html";

                } catch (error) {

                    console.error(
                        "Update blog error:",
                        error
                    );

                    alert(
                        "Failed to update blog."
                    );

                }

                return;

            }


            // ========================================
            // CREATE MODE → CREATE BLOG
            // ========================================

            try {

                const response =
                    await fetch(
                        "https://blognest-zeta.vercel.app/api/blog/create",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`
                            },

                            body: JSON.stringify({

                                title: title,

                                content: content,

                                category: category

                            })

                        }
                    );

                const data =
                    await response.json();

                if (!response.ok) {

                    alert(
                        data.message ||
                        "Failed to publish blog."
                    );

                    return;

                }

                alert(
                    data.message ||
                    "Blog published successfully!"
                );

                // Go back to dashboard
                window.location.href =
                    "dashboard.html";

            } catch (error) {

                console.error(
                    "Create blog error:",
                    error
                );

                alert(
                    "Failed to publish blog."
                );

            }

        }
    );

}