const Task = require('../models/task');

const getAllTasks = async (req, res) => {

  try {

    const tasks = await Task.find({});
    res.status(201).json({ tasks });

  } catch (error) {
    console.log(error);
  }

}

const createTask = async (req, res) => {
  try {
    const tasks = await Task.create(req.body);
    res.status(201).json({ tasks });
  } catch (err) {
    res.status(500).json({
      'error': err.message
    });
  }
}

const getTask = async (req, res) => {

  try {

    const tasks = await Task.findById(req.params.id);

    if (!tasks) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.status(201).json({ tasks });

  } catch (error) {
    res.status(500)
    .json({
      success: false,
      message: error.message
    })
    console.log(error);
  }
}

const updateTask = async (req, res) => {
  try {
    const {id} = req.params;

    const task = await Task.findOneAndUpdate(
      {_id: id}, req.body,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false
      }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: `Task with id : ${id} could not be found`
      });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

const deleteTask = async (req, res) => {
  try {
    const item = await Task.findOneAndDelete({_id: req.params.id});

    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Task with id ${req.params.id} not found`
      });
    }
    res.status(200).json({
      sucess: true,
      message: "Task deleted successfully",
      data: { item }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
}