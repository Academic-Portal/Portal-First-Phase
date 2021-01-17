const mongoose = require('mongoose');

const uploadSchema = {
    filename: String,
    courseno: String,
    branch: String,
    name: String,
    link: String
  };

module.exports = mongoose.model("coursematerial", uploadSchema);