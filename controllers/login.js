import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { SECRET } from "../util/config.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const body = req.body;

  const user = await User.findOne({
    where: {
      username: body.username,
    },
  });

  const passwordCorrect = body.password === "secret";

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);

  res
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

export default router;
