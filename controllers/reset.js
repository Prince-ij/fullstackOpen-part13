import express from "express";
import { sequelize } from "../util/db.js";
import Blog from "../models/blog.js";
import User from "../models/user.js";
import Sessions from "../models/session.js";
import ReadingList from "../models/reading_list.js";

const router = express.Router();

router.post("/", async (req, res) => {
  await Sessions.destroy({ where: {} });
  await ReadingList.destroy({ where: {} });
  await Blog.destroy({
    where: {},
  });
  await User.destroy({
    where: {},
  });

  res.status(204).end();
});

export default router;
