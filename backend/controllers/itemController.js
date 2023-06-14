const Items = require("../models/itemModel");

const itemController = {
  getItems: async (req, res) => {
    try {
      const items = await Items.find({ owner_id: req.user.id });
      res.json({ problems: items, success: true });
    } catch (error) {
      return res.status(500).json({ msg: error.message, success: false });
    }
  },
  createItem: async (req, res) => {
    try {
      const itemToSave = new Items({ ...req.body, owner_id: req.user.id });
      const savedProblem = await itemToSave.save();

      res.json({ msg: "Successfully saved leetcode problem.", success: true, savedProblem });
    } catch (error) {
      return res.status(500).json({ msg: error.message, success: false });
    }
  },
  updateItem: async (req, res) => {
    try {
      await Items.findByIdAndUpdate({ _id: req.params.id }, { ...req.body });
      res.json({ msg: "Updated leetcode problem.", success: true });
    } catch (error) {
      return res.status(500).json({ msg: error.message, success: false });
    }
  },
  deleteItem: async (req, res) => {
    try {
      await Items.findByIdAndDelete({ _id: req.params.id });
      res.json({ msg: "Deleted leetcode problem.", success: true });
    } catch (error) {
      return res.status(500).json({ msg: error.message, success: false });
    }
  },
  deleteItems: async (req, res) => {
    try {
      const ids = req.body;
      await Items.deleteMany({ _id: { $in: ids } });
      res.json({ msg: "Deleted leetcode problem.", success: true });
    } catch (error) {
      return res.status(500).json({ msg: error.message, success: false });
    }
  },
};
module.exports = itemController;
