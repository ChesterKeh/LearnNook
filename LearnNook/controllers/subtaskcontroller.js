const Task = require("../models/Task");

const create = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const task = await Task.findById(id);
  task.subtask.push(data);
  await task.save();
  res.json({ msg: "subtask", data, task });
};

module.exports = {
  create,
};
