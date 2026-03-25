import express from "express";
import Blog from "../models/blog.js";
import { sequelize } from "../util/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const authors = await Blog.findAll({
    group: "author",
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("title")), "blogs"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
    ],
    order: ["likes"],
  });
  return res.status(200).json(authors);
});

export default router;
