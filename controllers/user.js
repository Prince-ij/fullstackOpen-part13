import express from "express";
import User from "../models/user.js";
import Blog from "../models/blog.js";
import ReadingList from "../models/reading_list.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: {
      model: Blog,
      attributes: {
        exclude: ["userId", "blogId", "createdAt", "updatedAt"],
      },
    },
  });
  return res.status(200).json(users);
});

router.get("/:id", async (req, res) => {
  const where = {};

  if (req.query.read) {
    where.read = req.query.read === "true";
  }

  const user = await User.findByPk(req.params.id, {
    attributes: {
      exclude: ["id", "createdAt", "updatedAt"],
    },
    include: {
      model: Blog,
      as: "readings",
      attributes: {
        exclude: ["userId", "blogId", "createdAt", "updatedAt"],
      },
      through: {
        where,
        as: "reading_list",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    },
  });
  return res.status(200).json(user);
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
