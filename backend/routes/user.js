// backend/routes/user.js
const express = require("express");
import { z } from "zod";
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const router = express.Router();
const app = express();

const signupBody = z.object({
  username: z.string().min(3).max(30).toLowerCase(),
  firstName: z.string().max(50).trim(),
  lastName: z.string().max(50).trim(),
  password: z.string().min(6),
});

router.post("/signup", async (req, res) => {
  const userDetails = req.body();
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Username already taken / Incorrect inputs !",
    });
  }
  const createdUser = await User.create(userDetails);
  const userId = createdUser._id;

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({
    message: "User created successfully",
    token: token,
  });
});

const siginBody = z.object({
  username: z.string().email(),
  password: z.string(),
});

router.post("/signin", async (req, res) => {
  const { success } = siginBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    res.json({
      token: token,
    });
  }

  res.status(411).json({
    message: "Error while logging in",
  });
});

const updateBody = z.object({
  password: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

router.put("/user", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }
  const updatedDoc = await User.findOneAndUpdate({ _id: req.userId }, req.body);
  if (updatedDoc)
    res.json({
      message: "Updated successfully",
    });
  else
    res.json({
      message: "Error while updating information",
    });
});

module.exports = router;
