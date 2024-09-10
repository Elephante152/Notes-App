require('dotenv').config();

const express = require('express');
const cors = require('cors');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const connectDB = require('./server/config/db');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');

const app = express();
const port = 3000 || process.env.PORT;

// CORS Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
}));

// Session handling with MongoDB session store
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false, // Set to false to avoid creating sessions for unauthenticated users
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  cookie: { secure: false }, // Set secure to true for HTTPS in production
}));

// Passport middleware for authentication
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// Debugging session data
app.use((req, res, next) => {
  console.log("Session Data: ", req.session);
  console.log("Authenticated User: ", req.user);
  next();
});

// Connect to Database
connectDB();

// Static Files
app.use(express.static('public'));

// Templating Engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./server/routes/auth'));
app.use('/', require('./server/routes/index'));
app.use('/', require('./server/routes/dashboard'));

// Handle 404
app.get('*', function (req, res) {
  res.status(404).render('404');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
