const express = require('express'); // Server structure
const cors = require('cors'); // Enable connection to front-end
const {
    errors
} = require('celebrate'); // Validation

const db = require('./database/connection'); // Var only used for the db connection, plz dont delete
const routes = require('./routes'); // Backend routes

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(routes);
app.use(errors);

module.exports = app;