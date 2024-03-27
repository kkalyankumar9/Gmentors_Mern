const mongoose = require("mongoose");
const taskSchema = mongoose.Schema({
  userID: String,
  name: String,
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 500,
    trim: true,
  },
});

const TaskModel = new mongoose.model("taskData", taskSchema);
module.exports = { TaskModel };
