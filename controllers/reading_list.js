import express from "express";
import ReadingList from "../models/reading_list.js";
import { tokenExtractor } from "../util/middleware.js";
import Blog from "../models/blog.js";
import User from "../models/user.js";

const router = express.Router();

router.post("/", async (req, res) => {
  if (!(req.body.userId && req.body.blogId)) {
    return res.status(400).json({ Error: "Missing Fields" });
  }
  const user = await User.findByPk(req.body.userId);
  if (!user) {
    return res.status(404).json({ Error: "User does not exist" });
  }
  const blog = await Blog.findByPk(req.body.blogId);
  if (!blog) {
    return res.status(404).json({ Error: "Blog does not exist" });
  }
  const read_list_in_db = await ReadingList.findOne({
    where: {
      userId: req.body.userId,
      blogId: req.body.blogId,
    },
  });
  console.log(read_list_in_db);
  if (read_list_in_db) {
    return res.status(400).json({ Error: "Blog Already Exists" });
  }
  const read_list = await ReadingList.create(req.body);
  return res.status(201).json({
    id: read_list.id,
    user_id: read_list.userId,
    read: read_list.read,
    blog_id: read_list.blogId,
  });
});

router.put("/:id", tokenExtractor, async (req, res) => {
  const read_list = await ReadingList.findByPk(req.params.id);
  if (!read_list) {
    return res.status(404).json({ Error: "Non Existent Reading List" });
  }
  if (req.decodedToken.id !== read_list.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  read_list.read = req.body.read;
  await read_list.save();
  return res.status(200).json({
    id: read_list.id,
    user_id: read_list.userId,
    read: read_list.read,
    blog_id: read_list.blogId,
  });
});

export default router;
