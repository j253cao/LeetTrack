const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    owner_id: {
      type: String,
    },
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: false,
    },
    tags: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Items", itemSchema);
