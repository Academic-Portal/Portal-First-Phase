const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require("multer");
const formidable = require('express-formidable');


const  mongoAtlasUri =
        "mongodb+srv://nitin:nitin@12@cluster0.5pezp.mongodb.net/apDB?retryWrites=true&w=majority";
try {
  // Connect to the MongoDB cluster
   mongoose.connect(
    mongoAtlasUri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected")
  );

} catch (e) {
  console.log("could not connect");
}

mongoose.set("useCreateIndex", true);



// mongodb+srv://nitin:<password>@cluster0.5pezp.mongodb.net/<dbname>?retryWrites=true&w=majority

const app = express();

app.use(express.static('./public'));

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


const fs = require("fs");
const OAuth2Data = require("./credentials.json");
const { google } = require("googleapis");
const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URL = OAuth2Data.web.redirect_uris[0];
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);
var authed = false;
// var chk = false;

// If modifying these scopes, delete token.json.
const SCOPES =
  "https://www.googleapis.com/auth/drive.file";

  // app.get('/', function (req,res) {
  //   res.sendFile(__dirname+'/public/' + "index.html");
  // });


app.get("/api/StudyMaterial/upload", (req, res) => {
  if (!authed) {
    // Generate an OAuth URL and redirect there
    var url = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });
    res.json({authUrl: url, authDone: 0});
  } else {
    var oauth2 = google.oauth2({
      auth: oAuth2Client,
      version: "v2",
    });
    res.json({authDone: 1});

  }
});

app.post("/api/googleCallback", function (req, res) {
  const code = req.body.data.code;
  if (code) {
    // Get an access token based on our OAuth code
    oAuth2Client.getToken(code, function (err, tokens) {
      if (err) {
        console.log("Error authenticating");
        console.log(err);
      } else {
        console.log("Successfully authenticated");
        console.log(tokens)
        oAuth2Client.setCredentials(tokens);


        authed = true;
        res.redirect("/api/StudyMaterial/upload");
        // res.json({authDone: 1});
      }
    });
  }
  else{
    res.json({authDone: 0});
  }
});


var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "./images");
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
  });

var upload = multer({
  storage: Storage,
});


const uploadSchema = {
  filename: String,
  courseno: String,
  branch: String,
  name: String,
  link: String
};


const Assignment = mongoose.model("assignment", uploadSchema);
const Note = mongoose.model("note", uploadSchema);
const CourseMaterial = mongoose.model("coursematerial", uploadSchema);
const RecentUpload = mongoose.model("recentupload",uploadSchema);


app.post('/api/search', function(req, res){
  // console.log(req.body);
  var Model;
  if(req.body.optradio === "assignments")
    Model = Assignment;
  else if(req.body.optradio === "notes")
    Model = Note;
  else if(req.body.optradio === "coursematerial")
    Model = CourseMaterial;

  Model.find({},function (err, items) {
    if(!err){
      if(items.length === 0){
        res.send(items);
      }
      else {
        var filteredItems = [];
        items.forEach(item => {
          if(item.filename.toLowerCase().includes(req.body.searchString.toLowerCase())){
            filteredItems.push(item)
          }
        })
        res.send(filteredItems);
      }
    }
  });
});



app.post('/api/uploadMetadata', upload.single('file'), (req,res) => {
  
  var filename1 = req.body.filename;
  var courseno1 = req.body.courseno;
  var branch1 = req.body.branch;
  var name1 = req.body.name;
  var optradio1 = req.body.optradio;
  
    upload.single('file')(req, res, (err)=> {

      if (err) {
        console.log(err);
        return res.end("Something went wrong");
      } else {
        console.log(req.file);
        const drive = google.drive({ version: "v3",auth:oAuth2Client  });
        const fileMetadata = {
          name: req.file.filename,
        };
        const media = {
          mimeType: req.file.mimetype,
          body: fs.createReadStream(req.file.path),
        };
        drive.files.create(
          {
            resource: fileMetadata,
            media: media,
            fields: "id",
          },
          (err, file) => {
            if (err) {
              // Handle error
              console.error(err);
            } else {
              fs.unlinkSync(req.file.path)
              
              const resource = {"role": "reader", "type": "domain", "domain": "iittp.ac.in"};
              drive.permissions.create({fileId: file.data.id, sendNotificationEmail: false, resource: resource}, (error, result)=>{
              if (error) return;
              else{
                var link1 = "https://drive.google.com/file/d/" + file.data.id + "/view" ;

                if(optradio1 === "assignments"){
                var assgn = new Assignment({
                  filename: filename1,
                  courseno: courseno1,
                  branch: branch1,
                  name: name1,
                  link: link1
                });
              } else if (optradio1 === "notes") {
                var assgn = new Note({
                  filename: filename1,
                  courseno: courseno1,
                  branch: branch1,
                  name: name1,
                  link: link1
                });
              } else if (optradio1 === "coursematerial") {
                var assgn = new CourseMaterial({
                  filename: filename1,
                  courseno: courseno1,
                  branch: branch1,
                  name: name1,
                  link: link1
                });
              }

                RecentUpload.find({}, function(err, items){
                  if(!err){
                    if(items.length === 3){
                      RecentUpload.findOneAndDelete({},{sort: {'created_at': 1} }, function(err, item){
                        if(err)
                          console.log(err);
                        else{
                          console.log("deleted ", item);
                        }
                      });
                    }
                  }
                });

                var recentUpload = new RecentUpload({
                  filename: filename1,
                  courseno: courseno1,
                  branch: branch1,
                  name: name1,
                  link: link1
                });
                recentUpload.save();

                assgn.save();
              }
      //If this work then we know the permission for public share has been created
              });
              res.json({UploadDone: 1});
            }

          }
        );
      }
      });

  

});





app.listen(3001,function(){
    console.log("asfdasdf");
});
