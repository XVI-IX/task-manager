const Task = require('../models/task');
const asyncWrapper = require('../middleware/async');
const {createCustomError} = require('../errors/custom-error');

const getAllTasks = asyncWrapper (async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
})

const createTask = asyncWrapper (async (req, res) => {
    const tasks = await Task.create(req.body);
    res.status(200).json({ tasks });
})

const getTask = asyncWrapper (async (req, res, next) => {
    const tasks = await Task.findById(req.params.id);

    if (!tasks) {
      return next(createCustomError(
        `No task with id: ${req.params.id}`, 404
      ));
    }

    res.status(200).json({ tasks });
});

const updateTask = asyncWrapper (async (req, res) => {
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
      return next(createCustomError(
        `No task with id: ${id}`, 404
      ));
    }

    res.status(200).json({ task });
});

const deleteTask = asyncWrapper (async (req, res) => {
    const item = await Task.findOneAndDelete({_id: req.params.id});

    if (!item) {
      return next(createCustomError(
        `No task with id: ${req.params.id}`, 404
      ));
    }
    res.status(200).json({
      sucess: true,
      message: "Task deleted successfully",
      data: { item }
    });
})

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
}