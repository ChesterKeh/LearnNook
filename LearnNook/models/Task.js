const { model, Schema } = require("mongoose");

const subtaskSchema = new Schema(
  {
    item: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = model("task", taskSchema);
