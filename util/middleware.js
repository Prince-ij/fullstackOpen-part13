import { SECRET } from "../util/config.js";
import jwt from "jsonwebtoken";
import Session from "../models/session.js";

const errorHandler = (error, req, res, next) => {
  console.log("Error", error.name);

  if (error.name === "SequelizeDatabaseError") {
    console.log(error);
    return res.status(400).json({
      [error.message.split(":")[0]]: error.message.split(":")[1],
    });
  }

  if (error.name === "SequelizeValidationError") {
    console.log(error);
    return res.status(400).json({
      [error.message.split(":")[0]]: error.message.split(":")[1],
    });
  }
  next(error);
};

export const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      const decodedToken = jwt.verify(authorization.substring(7), SECRET);
      const session = await Session.findOne({
        where: {
          token: authorization.substring(7),
        },
      });
      if (!session) {
        return res.status(401).json({ error: "session expired" });
      } else {
        req.decodedToken = decodedToken;
      }
    } catch {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

export default errorHandler;
