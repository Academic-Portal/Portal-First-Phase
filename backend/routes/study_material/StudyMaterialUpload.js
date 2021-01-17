
require('dotenv').config();
const express = require('express');
const router = express.Router();
const multer = require("multer");

const fs = require("fs");
// const OAuth2Data = require("../../credentials.json");
const { google } = require("googleapis");
// const CLIENT_ID = OAuth2Data.web.client_id;
// const CLIENT_SECRET = OAuth2Data.web.client_secret;
// const REDIRECT_URL = OAuth2Data.web.redirect_uris[0];
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);
var authed = false;

const SCOPES =
  "https://www.googleapis.com/auth/drive.file";


router.get("/api/StudyMaterial/upload", (req, res) => {
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

router.post("/api/googleCallback", function (req, res) {
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
      }
    });
  }
  else{
    res.json({authDone: 0});
  }
});

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "./documents");
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
  });

var upload = multer({
  storage: Storage,
});

const Assignment = require('../../models/Assignment');
const Note = require('../../models/Note');
const CourseMaterial = require('../../models/CourseMaterial');
const RecentUpload = require('../../models/RecentUpload');

router.post('/api/uploadMetadata', upload.single('file'), (req,res) => {
  
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

module.exports = router;