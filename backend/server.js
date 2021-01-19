const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const connectDB = require('./config/db');

connectDB();

mongoose.set("useCreateIndex", true);

const app = express();

app.use(
    cors({
      origin: 'http://localhost:3000',
      methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
      credentials: true,
    })
  );



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


const router1 = require('./routes/study_material/StudyMaterialUpload');

app.use(router1);

const router2 = require('./routes/study_material/StudyMaterialSearch');

app.use(router2);

app.use('/issues', require('./routes/issues/issues.js'));

const PORT = 3001;

app.listen(PORT, function(){
    console.log("Server started at 3001");
});
