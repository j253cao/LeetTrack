require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const authRouter = require("./routes/authRouter");
const itemRouter = require("./routes/itemRouter");
const app = express();

app.use(express.json());
app.use(cors());

//routes
app.use("/auth", authRouter);
app.use("/item", itemRouter);

const MONGOOSE_URI = process.env.MONGODB_URL;

try {
  mongoose.connect(MONGOOSE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB");
} catch (error) {
  throw error;
}

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "../client/public/index.html"), (err) => {
    if (err) res.status(500).send(err);
  });
});

// Listen Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
