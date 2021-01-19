
const express = require('express');
const router = express.Router();

const Assignment = require('../../models/Assignment');
const Note = require('../../models/Note');
const CourseMaterial = require('../../models/CourseMaterial');

router.post('/api/search', function(req, res){
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

module.exports = router;
