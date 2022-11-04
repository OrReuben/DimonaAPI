const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'The text field is required'],
  },
  password: {
    type: String,
    required: [true, 'The text field is required'],
  },
  email: {
    type: String,
    required: [true, 'The text field is required'],
    unique:true,
  },
  img: {
    type: String,
  },

  isAdmin:{
    type:Boolean,
    default:false
  }
});


const User = mongoose.model('User', UserSchema);
module.exports = User;