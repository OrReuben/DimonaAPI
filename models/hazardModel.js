const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create schema for todo
const HazardsSchema = new Schema({
  type: {
    type: String,
    required: [true, 'The text field is required'],
  },
  location: {
    type: String,
    required: [true, 'The text field is required'],
  },
  date: {
    type: String,
    required: [true, 'The text field is required'],
  },
  body: {
    type: String,
    required: [true, 'The text field is required'],
  },
  status: {
    type: String,
    required: [true, 'The text field is required'],
  },
});


const Hazard = mongoose.model('hazard', HazardsSchema);
module.exports = Hazard;