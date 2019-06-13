const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: String,
  workstations: [
    {
      workstation: {
        type: String,
        required: true
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

const Project = mongoose.model("project", ProjectSchema);

module.exports = Project;
