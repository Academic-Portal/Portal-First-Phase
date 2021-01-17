const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const connectDB = require('./config/db');

connectDB();

mongoose.set("useCreateIndex", true);

const app = express();

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin','*')
  next()
})

app.use(
    cors({
      origin: 'http://localhost:3000',
      methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
      credentials: true,
    })
  );



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



const router1 = require('./routes/study_material/StudyMaterialUpload');

app.use(router1);

const router2 = require('./routes/study_material/StudyMaterialSearch');

app.use(router2);

app.listen(3001,function(){
    console.log("asfdasdf");
});
