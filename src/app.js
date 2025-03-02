const session = require("express-session"); 
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const { checkAuth } = require("./middlewares/auth");

// Initialize the app
const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/pro')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Middleware to parse URL-encoded and JSON data
app.use(express.urlencoded({ extended: true }));
// Middleware to parse JSON data in the request body
app.use(express.json());
// Serve static files (like images, styles, scripts) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
// Middleware to parse cookies from incoming requests
app.use(cookieParser());
// Configuring express-session
app.use(
  session({
    secret: "hola", 
    resave: false,
    saveUninitialized: false,
    cookie: {    
      httpOnly: true,
      secure: false, //for https
      maxAge: 24 * 60 * 60 * 1000, 
    },
  })
);
// Global variable for checking login status
app.locals.login = false;
// Middleware to pass session data to views
app.use((req, res, next) => {
  if (req.session.user) {
    app.locals.login = true; //setting it true is user is found
    app.locals.user = req.session.user; 
  } else {
    app.locals.login = false;
  }
  next();
});
///////////////////////////////////////////////////
// Set the view engine to EJS
app.set('view engine', 'ejs');
// Set the location of the views directory
app.set('views', path.join(__dirname, 'views'));

// Importing routes and using them
const indexRouter = require('./routes/sign');
const mainRouter = require('./routes/main');

app.use('/' , indexRouter);
app.use('/main' ,checkAuth, mainRouter);
//app.use('/main/localarm')
//app.use('/main/taskonthat date/')



//server start
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
