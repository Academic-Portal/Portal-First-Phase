const express = require("express");
const connectDB = require('./config/db');
const app = express();

connectDB();


// Bodyparser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Routes
app.use('/issues', require('./routes/issues'));

const PORT = 5000;

app.listen(
    PORT, 
    console.log(`server running on mode on port ${PORT}`)
);