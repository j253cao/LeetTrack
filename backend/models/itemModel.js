const mongoose = require("mongoose");

const tag = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
});

const itemSchema = new mongoose.Schema(
  {
    questionId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    titleSlug: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    topicTags: { type: [tag], required: true, default: [] },
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
