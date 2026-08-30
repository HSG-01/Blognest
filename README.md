# BlogNest

> Ideas Worth Sharing. Stories Worth Reading.

BlogNest is a responsive Blog Application developed as part of my Codomax Digital Solutions Full Stack Web Development Internship.

## About the Project

BlogNest is a modern blog platform where users can explore blog content, create an account, log in, manage their dashboard, and create blog posts.

The project is being developed module-by-module, starting with frontend development and progressing toward backend API integration and database persistence.

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

## Module 2 – Backend Development

The backend was developed using Node.js and Express.js.

### Backend Features

- Node.js and Express.js server
- REST API implementation
- User Registration API
- User Login API
- Create Blog API
- Get All Blogs API
- View Blog API integration
- Frontend and Backend Integration
- JSON request and response handling
- CORS configuration
- Environment variable configuration

## Module 3 – Database

Database integration is the next development stage of the project.

### Planned Database Features

- MongoDB
- Mongoose
- Persistent user data
- Persistent blog data
- Database-based blog retrieval
- Persistent data after server restart

## Pages

The project contains the following pages:

1. Home
2. Login
3. Register
4. Dashboard
5. Create Blog
6. View Blog

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

### Database

- MongoDB
- Mongoose

### Development Tools

- Git
- GitHub
- Visual Studio Code
- npm

## Project Structure

```text
BlogNest/
│
├── backend/
│   ├── routes/
│   │   ├── auth.js
│   │   └── blog.js
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── CSS/
│   ├── auth.css
│   ├── dashboard.css
│   └── style.css
│
├── images/
│
├── Js/
│   ├── auth.js
│   ├── blog.js
│   ├── dashboard.js
│   ├── main.js
│   └── view-blog.js
│
├── Pages/
│   ├── create-blog.html
│   ├── dashboard.html
│   ├── login.html
│   ├── register.html
│   └── view-blog.html
│
├── .gitignore
├── Index.html
└── README.md