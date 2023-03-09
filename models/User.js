const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  },
  token: {
    type: String,
    required: false
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
  
});



// first parameter is folder name in DB Collection, second is const/function called
module.exports = mongoose.model('users', UserSchema);