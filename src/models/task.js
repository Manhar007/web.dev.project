
const mongoose = require('mongoose');

//  Task schema
const TaskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, 
  },
  title: {
    type: String,
    required: true, 
  },
  description: {
    type: String,
    required: false,
  },
  completionDate: {
    type: Date,
    required: true, 
  },
  completionTime: {
    type: String, 
    required: false,
  },
  setDate: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: String,
    required: false, 
  },
});

module.exports = mongoose.model('Task', TaskSchema,'tasks');


