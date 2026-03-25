import express from "express";
import User from "../models/user.js";
import Blog from "../models/blog.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: ["author", "url", "title"],
    },
  });
  return res.status(200).json(users);
});

router.post("/", async (req, res) => {
  const user = await User.create({ ...req.body });
  return res.status(201).json(user);
});

router.put("/:username", async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });
  user.name = req.body.name;
  await user.save();
  return res.status(200).json(user);
});

export default router;
