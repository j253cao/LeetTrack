const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    console.log(token);
    if (!token) return res.status(400).json({ msg: "Invalid Authentication" });
    
    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(400).json({ msg: "Authorization not valid." });

      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = authenticate;
