const mongoose = require("mongoose");
const itemModel = require("./itemModel");

const userSpecificModel = new mongoose.Schema(
  {
    problem: {
      type: itemModel.schema,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    problems: {
      type: [userSpecificModel],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
