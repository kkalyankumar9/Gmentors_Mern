const express = require("express");
const { auth } = require("../middleware/auth");
const { TaskModel } = require("../models/taskModel");

const taskRoutes = express.Router();

taskRoutes.use(auth);

taskRoutes.get("/get", async (req, res) => {
  try {
    const data = await TaskModel.find({ userID: req.body.userID });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

taskRoutes.post("/create", async (req, res) => {
  try {
    const { userID, name, title, description } = req.body;

    // Check if title and description are provided
    if (!title || !description) {
      return res
        .status(400)
        .send({ error: "Title and description are required" });
    }

    const data = new TaskModel({ userID, name, title, description });
    await data.save();
    res.status(201).send({ msg: "New task has been created", data: data });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

taskRoutes.patch("/update/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const data = await TaskModel.findOne({ _id: id });
    if (!data) {
      return res.status(404).send({ error: "Task not found" });
    }
    if (data.userID !== req.body.userID) {
      return res.status(403).send({ error: "Not authorized" });
    }
    await TaskModel.findByIdAndUpdate(id, req.body);
    res.status(200).send({ msg: `Task with id ${id} has been updated` });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

taskRoutes.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await TaskModel.findOne({ _id: id });
    if (!data) {
      return res.status(404).send({ error: "Task not found" });
    }
    if (data.userID !== req.body.userID) {
      return res.status(403).send({ error: "Not authorized" });
    }
    await TaskModel.findByIdAndDelete(id);
    res.status(200).send({ msg: `Task with id ${id} has been deleted` });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = { taskRoutes };
