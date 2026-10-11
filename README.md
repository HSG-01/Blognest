# BlogNest

> Ideas Worth Sharing. Stories Worth Reading.

BlogNest is a responsive full-stack blog application developed as part of my **Codomax Digital Solutions Full Stack Web Development Internship**.

It allows users to register, log in securely, explore blogs, create and manage their own posts, search and filter content, view previously visited blogs, and manage their profiles through a responsive interface.

## Live Demo

**Live Website:** [Open BlogNest](https://blognest-frontend-pearl.vercel.app/)

**GitHub Repository:** [HSG-01/Blognest](https://github.com/HSG-01/Blognest)

**Frontend:** Vercel  
**Backend:** Vercel  
**Database:** MongoDB Atlas

> If your Vercel frontend URL differs from the link above, replace it with the correct public frontend URL.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Module 1 - Frontend Development](#module-1---frontend-development)
- [Module 2 - Backend Development](#module-2---backend-development)
- [Module 3 - Database Integration](#module-3---database-integration)
- [Module 4 - CRUD Operations](#module-4---crud-operations)
- [Module 5 - Authentication and Authorization](#module-5---authentication-and-authorization)
- [Module 6 - Final Project and Deployment](#module-6---final-project-and-deployment)
- [Project Structure](#project-structure)
- [Installation and Setup](#installation-and-setup)
- [Environment Variables](#environment-variables)
- [Future Improvements](#future-improvements)
- [Project Links](#project-links)

---

## Project Overview

BlogNest is a full-stack blogging platform that combines a responsive frontend, a REST API backend, and a cloud-hosted database.

The project was developed incrementally across six internship modules, covering frontend development, backend development, database integration, CRUD operations, authentication, authorization, responsive design, and deployment.

### Objectives

- Build a functional full-stack web application.
- Implement REST APIs using Node.js and Express.js.
- Store users and blog posts using MongoDB Atlas.
- Implement JWT-based authentication.
- Restrict blog modification to the blog owner.
- Create a personalized dashboard.
- Deploy the frontend and backend for public access.

---

## Features

### User Features

- User registration and login.
- JWT-based authentication.
- Protected dashboard access.
- User profile page.
- Logout functionality.
- Personalized welcome message.

### Blog Management

- Create blog posts.
- View all available blogs.
- View individual blog details.
- Edit your own blog posts.
- Delete your own blog posts.
- Search blogs.
- Filter blogs by category.
- Track blog views.

### Personalized Dashboard

- **Dashboard:** Displays blogs previously viewed by the current user.
- **My Blogs:** Displays blogs created by the current user.
- **Blogs:** Displays available blogs with search and category filtering.
- **Profile:** Displays the logged-in user's profile information.
- **Create Blog:** Provides a form to publish a new blog post.

### User Interface

- Responsive homepage.
- Responsive dashboard and sidebar.
- Mobile-friendly interface.
- Dark and light theme support.
- Responsive login and registration pages.
- Consistent navigation across pages.

### Security and Authorization

- Password hashing using bcrypt.
- JWT token verification.
- Protected API routes.
- Owner-based blog modification permissions.
- Users cannot edit or delete another user's blogs.
- Authentication information is not returned as a password in API responses.

---

## Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- Node.js
- Express.js
- REST APIs
- CORS
- dotenv
- bcrypt
- JSON Web Token (JWT)

### Database

- MongoDB Atlas
- MongoDB
- Mongoose

### Development and Deployment

- Visual Studio Code
- Git
- GitHub
- npm
- Vercel

---

## Module 1 - Frontend Development

The first module focused on building the user interface and basic client-side functionality.

### Features Implemented

- Homepage.
- Login page.
- Registration page.
- Dashboard interface.
- Create Blog page.
- View Blog page.
- User Profile page.
- Responsive navigation.
- Form validation.
- Blog title character counter.
- Blog content character counter.
- Live blog preview.
- Responsive sidebar.
- Dark and light theme support.

**Status: Completed**

---

## Module 2 - Backend Development

The second module focused on creating the server and REST APIs using Node.js and Express.js.

### Backend Features

- Express.js server setup.
- User registration API.
- User login API.
- Create Blog API.
- Get All Blogs API.
- Get Individual Blog API.
- Update Blog API.
- Delete Blog API.
- Blog view API.
- Viewed Blogs API.
- JSON request and response handling.
- Frontend and backend integration.
- CORS configuration.
- Environment variable configuration.

**Status: Completed**

---

## Module 3 - Database Integration

The third module focused on persistent database storage using MongoDB Atlas and Mongoose.

### Database Features

- MongoDB Atlas connection.
- User data persistence.
- Blog data persistence.
- Database-based user authentication.
- Blog retrieval from MongoDB.
- Individual blog retrieval using MongoDB ObjectId.
- Blog view counter.
- User-specific viewed blog records.
- Created and updated timestamps.

### User Authentication

- User registration.
- Duplicate email checking.
- Password hashing using bcrypt.
- Password comparison during login.
- Password exclusion from API responses.

### Blog Data

Blog records can contain:

- Title.
- Content.
- Author.
- User ID.
- Category.
- Status.
- Date.
- View count.
- Created timestamp.
- Updated timestamp.

### Viewed Blog Data

Viewed blog records store:

- User ID.
- Blog ID.
- Viewed timestamp.

This supports a personalized dashboard that displays previously viewed blogs for the logged-in user.

**Status: Completed**

---

## Module 4 - CRUD Operations

The fourth module focused on implementing complete Create, Read, Update, and Delete functionality.

### Create

Users can create blog posts with a title, category, content, and author information. Blog posts are stored in MongoDB.

### Read

Users can retrieve all available blogs and view individual blog details.

### Update

Users can edit their own existing blog posts. Existing blog data can be loaded into the editing interface and saved to MongoDB.

### Delete

Users can delete their own blog posts. Deleted posts are removed from the database.

### Search and Filtering

- Search by blog title.
- Search by blog content.
- Filter blogs by category.

### Dashboard Statistics

The dashboard displays statistics based on the blogs loaded for the selected view, including blog counts, published blogs, drafts, and views.

**Status: Completed**

---

## Module 5 - Authentication, Authorization and User Profile

The fifth module focused on securing the application and implementing user-specific functionality.

### Authentication

- JWT token generation after successful login.
- Token storage in browser Local Storage.
- Authentication middleware.
- Token verification.
- Handling invalid or expired tokens.
- Protected dashboard access.
- Protected blog creation, updating, and deletion.

### Authorization

BlogNest implements owner-based authorization.

- Logged-in users can view available blogs.
- Users can create their own blog posts.
- Users can edit their own blog posts.
- Users cannot edit another user's blog.
- Users can delete their own blog posts.
- Users cannot delete another user's blog.
- Blog ownership is checked using the authenticated user's ID.

Older blogs are not automatically assigned to newly registered users.

### User Profile

The profile page displays information associated with the logged-in user, including their name and email address.

### Logout

When a user logs out:

- The stored JWT token is removed.
- Stored user information is removed.
- The user is redirected away from the protected dashboard.

### Security Testing

Owner-based authorization was tested to verify that users cannot modify blog posts belonging to other users.

**Status: Completed**

---

## Module 6 - Final Project and Deployment

The sixth module focused on finalizing the application, improving responsiveness, fixing bugs, updating documentation, and deploying the application.

### Final Improvements

- Responsive homepage.
- Consistent sidebar navigation.
- Dashboard navigation for Dashboard, My Blogs, Blogs, Create Blog, and Profile.
- Dynamic welcome message.
- Search and category filtering.
- Personalized dashboard views.
- Owner-only Edit and Delete controls.
- Dark and light theme support.
- Corrected frontend resource paths for deployment.
- Responsive layout for desktop and mobile devices.

### Deployment

- **Frontend:** Vercel
- **Backend:** Vercel
- **Database:** MongoDB Atlas

The application has been tested on a laptop and a phone.

### Final Testing

The following areas have been tested:

- Registration and login.
- Authentication and protected routes.
- Blog creation and viewing.
- Blog editing and deletion.
- Search and category filtering.
- Dashboard and My Blogs.
- Viewed Blogs functionality.
- User profile.
- Logout.
- Frontend styling and navigation.
- Mobile accessibility.

**Status: Completed**

---

## Project Structure

```text
BlogNest/
├── backend/
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Blog.js
│   │   ├── User.js
│   │   └── ViewedBlog.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── blog.js
│   ├── db.js
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
├── CSS/
│   ├── auth.css
│   ├── dashboard.css
│   ├── style.css
│   └── view-blog.css
├── images/
├── Js/
│   ├── auth.js
│   ├── blog.js
│   ├── dashboard.js
│   ├── main.js
│   ├── profile.js
│   └── view-blog.js
├── Pages/
│   ├── create-blog.html
│   ├── dashboard.html
│   ├── login.html
│   ├── profile.html
│   ├── register.html
│   └── view-blog.html
├── .gitignore
├── index.html
└── README.md
```

---

## Installation and Setup

Follow these steps to run BlogNest locally.

### Prerequisites

Install the following:

- Node.js and npm.
- Git.
- A MongoDB Atlas account.

### 1. Clone the Repository

```bash
git clone https://github.com/HSG-01/Blognest.git
cd Blognest
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the `backend` directory.

Add the required environment variables described in the next section.

### 4. Start the Backend

Run the backend using the available npm start script:

```bash
npm start
```

If your `package.json` uses a different development script, use the script defined there.

### 5. Open the Frontend

Open the root `index.html` file using a local web server or a development server that serves static HTML files.

Ensure the frontend API URLs point to the appropriate backend address for your environment.

---

## Environment Variables

The backend requires environment variables for database connectivity and JWT authentication.

Create `backend/.env` with the following variable names:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
PORT=5000
```

Replace the example values with your own configuration.

**Security notes:**

- Never commit your `.env` file to GitHub.
- Never publish your MongoDB connection string or JWT secret.
- Configure environment variables separately in your deployment platform.
- Use a strong, private JWT secret.
- Restrict database network access where practical.

---

## Future Improvements

Possible future enhancements include:

- Rich text blog editor.
- Blog comments and reactions.
- User profile image uploads.
- Pagination for large blog collections.
- Improved blog recommendations.
- Password reset functionality.
- Email verification.
- Additional accessibility improvements.

These are possible future enhancements and are not claimed as completed features.

---

## Project Links

- **Live Website:** [Open BlogNest](https://blognest-frontend-pearl.vercel.app/)
- **GitHub Repository:** [HSG-01/Blognest](https://github.com/HSG-01/Blognest)

---

## Acknowledgment

This project was developed as part of the **Codomax Digital Solutions Full Stack Web Development Internship**, providing practical experience in frontend development, backend APIs, database integration, authentication, authorization, responsive web design, Git, GitHub, and deployment.

---

**BlogNest — Ideas Worth Sharing. Stories Worth Reading.**