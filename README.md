# BlogNest

> Ideas Worth Sharing. Stories Worth Reading.

BlogNest is a responsive Blog Application developed as part of my Codomax Digital Solutions Full Stack Web Development Internship.

## About the Project

BlogNest is a modern blog platform where users can explore blog content, create an account, log in, manage their dashboard, and create and manage blog posts.

The project is being developed module-by-module, starting with frontend development and progressing toward backend API integration, database persistence, complete CRUD operations, secure authentication, authorization, and user profile functionality.

---

## Module 1 – Frontend Development

The frontend provides the user interface and basic client-side functionality.

### Features

- Responsive Home Page
- User Login Interface
- User Registration Interface
- Responsive Dashboard
- Create Blog Interface
- Blog Title Character Counter
- Blog Content Character Counter
- Live Blog Preview
- Basic JavaScript Form Validation
- Responsive Navigation
- Mobile-Friendly Sidebar
- Responsive Design for Desktop, Tablet, and Mobile

---

## Module 2 – Backend Development

The backend was developed using Node.js and Express.js.

### Backend Features

- Node.js and Express.js server
- REST API implementation
- User Registration API
- User Login API
- Create Blog API
- Get All Blogs API
- Get Individual Blog API
- Update Blog API
- Delete Blog API
- View Blog API integration
- Frontend and Backend Integration
- JSON request and response handling
- CORS configuration
- Environment variable configuration

---

## Module 3 – Database Integration

Database integration has been completed using MongoDB Atlas and Mongoose.

### Database Features

- MongoDB Atlas database integration
- Mongoose database connection
- Persistent user data
- Persistent blog data
- User registration stored in MongoDB
- User login using MongoDB user data
- Secure password hashing using bcrypt
- Database-based blog retrieval
- Create and store blog posts in MongoDB
- Retrieve all blogs from MongoDB
- Retrieve individual blog details using MongoDB ObjectId
- Blog view counter
- Persistent data after server restart

### Authentication

User authentication is integrated with MongoDB.

- User registration
- Duplicate email checking
- Password hashing using bcrypt
- Secure password comparison during login
- MongoDB-based login authentication
- Password is not returned in API responses

### Blog Database

Blog posts are stored permanently in the MongoDB database.

Each blog can contain:

- Title
- Content
- Author
- User ID
- Category
- Status
- Date
- Views
- Created timestamp
- Updated timestamp

### Module 3 Status

**Completed**

MongoDB Atlas is successfully connected to the BlogNest backend, and users and blog posts are being stored and retrieved from the database.

---

## Module 4 – CRUD Operations

Module 4 focuses on implementing complete CRUD operations for blog management.

### CRUD Features

- Create new blog posts
- Read and display all blogs
- Read individual blog details
- Update existing blog posts
- Delete blog posts
- Edit existing blog content
- Dynamic blog dashboard
- Database-based blog management

### Create

Users can create and publish new blog posts by providing:

- Blog Title
- Category
- Blog Content
- Author

The blog is stored permanently in MongoDB.

### Read

The dashboard retrieves blog posts directly from MongoDB and displays:

- Blog Title
- Category
- Status
- Date
- Views
- Actions

Users can also open individual blogs and view their content.

### Update

Users can edit existing blog posts.

The edit functionality:

- Loads existing blog data using the blog ID
- Displays the existing title
- Displays the existing category
- Displays the existing content
- Provides live preview
- Updates the blog in MongoDB
- Returns the user to the dashboard after successful update

### Delete

Users can delete blog posts directly from the dashboard.

After deletion, the blog is removed from the MongoDB database and no longer appears in the dashboard.

### Search Blogs

A search feature has been implemented to allow users to search blogs by:

- Blog title
- Blog content

The search results are displayed dynamically on the dashboard.

### Category Filter

Users can filter blogs according to their category.

Available categories include:

- Technology
- Programming
- AI & ML
- Web Development
- Career
- Productivity
- General

### Dynamic Dashboard Statistics

The dashboard statistics are connected to the actual database data.

The dashboard dynamically displays:

- Total Blogs
- Published Blogs
- Draft Blogs
- Total Views

These values are calculated from the blogs retrieved from MongoDB instead of using fixed values.

### Module 4 Status

**Completed**

Complete CRUD functionality has been implemented and tested successfully. Search, category filtering, and dynamic dashboard statistics have also been implemented.

---

## Module 5 – Authentication, Authorization & User Profile

Module 5 focuses on securing the BlogNest application using JWT authentication, protected routes, user authorization, profile functionality, and logout.

### Authentication Features

- JWT-based user authentication
- Secure login using JSON Web Tokens
- JWT token generation after successful login
- Token storage using browser Local Storage
- User information storage using browser Local Storage
- Authentication middleware for protected API routes
- Token verification using JWT
- Expired or invalid token handling
- Protected dashboard access
- Protected blog creation
- Protected blog update
- Protected blog deletion

### Authorization Features

BlogNest implements owner-based authorization for blog modification.

- All logged-in users can view available blogs
- Users can create their own blog posts
- Users can edit their own blog posts
- Users cannot edit another user's blog
- Users can delete their own blog posts
- Users cannot delete another user's blog
- Blog ownership is verified using the authenticated user's ID
- Existing older blogs are not automatically assigned to newly registered users

### Protected Routes

The following operations require authentication:

- Get blogs
- Create blog
- Update blog
- Delete blog

The individual blog viewing route remains available for viewing blog details.

### User Profile

A user profile page has been added.

The profile page displays:

- User name
- User email
- Profile information
- Back to Dashboard navigation

User information is retrieved from the authenticated user's stored profile data.

### Logout

Logout functionality has been implemented.

When the user logs out:

- JWT token is removed from Local Storage
- Stored user information is removed from Local Storage
- User is redirected to the Login page
- Protected dashboard access is no longer available without logging in again

Logout is available from:

- Dashboard
- Profile page

### Security Testing

Module 5 authorization has been tested successfully.

Example:

- User A can edit User A's blog
- User A can delete User A's blog
- User A can view User B's blog
- User A cannot edit User B's blog
- User A cannot delete User B's blog

Unauthorized update attempts return:

`Blog not found or you do not have permission to update it`

### Module 5 Status

**Completed**

JWT authentication, protected routes, owner-based authorization, user profile functionality, and logout have been implemented and tested successfully.

---

## Pages

The project contains the following pages:

1. Home
2. Login
3. Register
4. Dashboard
5. Create Blog
6. View Blog
7. Profile

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

### Development Tools

- Git
- GitHub
- Visual Studio Code
- npm

---

## Project Structure

```text
BlogNest/
│
├── backend/
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── Blog.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   └── blog.js
│   │
│   ├── db.js
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── CSS/
│   ├── auth.css
│   ├── dashboard.css
│   ├── style.css
│   └── view-blog.css
│
├── images/
│
├── JS/
│   ├── auth.js
│   ├── blog.js
│   ├── dashboard.js
│   ├── main.js
│   ├── profile.js
│   └── view-blog.js
│
├── Pages/
│   ├── create-blog.html
│   ├── dashboard.html
│   ├── login.html
│   ├── profile.html
│   ├── register.html
│   └── view-blog.html
│
├── .gitignore
├── Index.html
└── README.md