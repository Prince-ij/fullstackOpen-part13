const errorHandler = (error, req, res, next) => {
  console.log("Error", error.name);

  if (error.name === "SequelizeDatabaseError") {
    return res.status(400).json({
      [error.message.split(":")[0]]: error.message.split(":")[1],
    });
  }

  if (error.name === "SequelizeValidationError") {
    return res.status(400).json({
      [error.message.split(":")[0]]: error.message.split(":")[1],
    });
  }
  next(error);
};

export default errorHandler;
