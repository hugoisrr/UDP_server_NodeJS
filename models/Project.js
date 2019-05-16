const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schemas and Models

const WorkstationSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Name field is required']
  },
  description: String
});

const LocationSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Name field is required']
  },
  description: String,
  workstation: [WorkstationSchema]
});

const ProjectSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Name field is required']
  },
  description: String,
  location: [LocationSchema],
  date: {
    type: Date,
    default: Date.now
  }
});

const Project = mongoose.model('project', ProjectSchema);

module.exports = Project;
