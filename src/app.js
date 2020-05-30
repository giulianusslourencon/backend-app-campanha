const express = require('express'); // Server structure
const session = require('express-session'); // Required for authentication
const passport = require('./config/passport'); // Authentication framework
const cors = require('cors'); // Enable connection to front-end
const {
    errors
} = require('celebrate'); // Validation

const routes = require('./routes'); // Backend routes
require('./database/connection'); // Database connection

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);
app.use(errors);

module.exports = app;