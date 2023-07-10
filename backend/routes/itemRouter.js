const express = require("express");
const itemController = require("../controllers/itemController");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router
  .route("/")
  .get(authenticate, itemController.getUserItems)
  .post(authenticate, itemController.createUserItem)
  .delete(authenticate, itemController.deleteItem);

router.route("/getProblemInfo").post(itemController.getProblemInfo);

module.exports = router;
