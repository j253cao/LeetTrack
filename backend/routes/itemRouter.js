const express = require("express");
const itemController = require("../controllers/itemController");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.route("/").get(authenticate, itemController.getItems).post(authenticate, itemController.createItem).delete(authenticate, itemController.deleteItems);

router.route("/:id").put(authenticate, itemController.updateItem).delete(authenticate, itemController.deleteItem);

module.exports = router;
