import express from "express";
import { PORT } from "./util/config.js";
import { connectToDatabase } from "./util/db.js";
import errorHandler from "./util/middleware.js";
import { tokenExtractor } from "./util/middleware.js";
import "./models/index.js";

const app = express();
app.use(express.json());

import blogsRouter from "./controllers/blog.js";
import authorRouter from "./controllers/author.js";
import userRouter from "./controllers/user.js";
import loginRouter from "./controllers/login.js";
import resetRouter from "./controllers/reset.js";
import readingListRouter from "./controllers/reading_list.js";
import Session from "./models/session.js";

app.use("/api/blogs", blogsRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/authors", authorRouter);
app.use("/api/reset", resetRouter);
app.use("/api/readinglists", readingListRouter);

app.get("/", (req, res) => {
  res.status(200);
});

app.delete("/api/logout", tokenExtractor, async (req, res) => {
  const sessions = await Session.destroy({
    where: {
      userId: req.decodedToken.id,
    },
  });

  res.status(204).end();
});

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
