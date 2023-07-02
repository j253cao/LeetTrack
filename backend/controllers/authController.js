const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ msg: "Incorrect email or password" });

      const correctPassword = await bcrypt.compare(password, user.password);
      if (!correctPassword) return res.status(400).json({ msg: "Incorrect email or password" });

      // if login is successful, create a token
      const payload = { id: user._id, email: user.email, success: true };
      const token = jwt.sign(payload, process.env.JWT_TOKEN_SECRET, { expiresIn: "1d" });

      res.json({ token, ...payload });
    } catch (error) {
      return res.status(500).json({ msg: error.message, success: false });
    }
  },
  registerUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      //check if user exists
      const user = await Users.findOne({ email });
      if (user) return res.status(400).json({ msg: "User already exists" });

      const saltedPassword = await bcrypt.hash(password, 8);
      const userToSave = new Users({ email, password: saltedPassword });
      userToSave.save();

      res.json({ msg: "Sign up successful", success: true });
    } catch (error) {
      return res.status(500).json({ msg: error.message, success: false });
    }
  },
  verifyUser: async (req, res) => {
    try {
      const token = req.header("Authorization");
      if (!token) return res.send(false);

      jwt.verify(token, process.env.JWT_TOKEN_SECRET, async (err, verified) => {
        if (err) return res.send(false);

        const user = await Users.findById(verified.id);
        if (!user) return res.send(false);

        res.send(true);
      });
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = authController;
