//imports
const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/login", authController.loginUser);
router.post("/sign-up", authController.registerUser);
router.get("/verify", authController.verifyUser);

module.exports = router;
