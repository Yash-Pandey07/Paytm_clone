// backend/index.js
const express = require('express');
const router = express.Router();
const userRouter = require("./user");
const User = require('./models/User');  // Import the User model
const cors = require("cors");

app.use(cors());
const app = express.Router();

router.use("/user", userRouter)

app.use(express.json());

module.exports = router ;