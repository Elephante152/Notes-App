//Notes App

Notes is a productivity app that allows users to create, view, update, and delete notes. It also integrates with Google OAuth for secure login and session management. The app uses a simple, intuitive UI to enhance user experience and is designed to promote well-being and productivity.

//v1 Features

Secure authentication using Google OAuth
Create, view, update, and delete notes
Responsive user interface
Session management with express-session and connect-mongo
Error handling and user-friendly feedback
Deployed on Node.js and Express

//Tech Stack

Frontend: HTML, CSS (with images and styles in public/css)
Backend: Node.js, Express, EJS for templating
Database: MongoDB (with mongoose)
Authentication: Passport.js (Google OAuth 2.0)
Session Management: express-session with MongoDB store (connect-mongo)

//Install Dependencies Above and Update .env variables accordingly before running

//Dependencies

connect-mongo (^4.6.0) – MongoDB session store for Express.
cors (^2.8.5) – Middleware to enable Cross-Origin Resource Sharing (CORS).
dotenv (^16.0.3) – Module to load environment variables from a .env file.
ejs (^3.1.8) – Embedded JavaScript templating engine.
express (^4.18.2) – Web application framework for Node.js.
express-ejs-layouts (^2.5.1) – Layout support for EJS templates.
express-session (^1.17.3) – Session middleware for Express.
method-override (^3.0.0) – Middleware to override HTTP methods.
mongoose (^6.8.1) – MongoDB object modeling tool designed to work in an asynchronous environment.
passport (^0.6.0) – Authentication middleware for Node.js.
passport-google-oauth20 (^2.0.0) – Google OAuth 2.0 authentication strategy for Passport.

//DevDependencies

nodemon (^3.1.4) – Tool to automatically restart the Node.js application when file changes are detected during development.


//The app will be running on http://localhost:3000. Open your browser and navigate to this URL to interact with the app.

