import express from "express";
import { sequelize } from "../util/db.js";
import Blog from "../models/blog.js";
import User from "../models/user.js";

const router = express.Router();

router.post("/", async (req, res) => {
  await User.destroy({
    where: {},
  });
  await Blog.destroy({
    where: {},
  });
  res.status(204).end();
});

export default router;
