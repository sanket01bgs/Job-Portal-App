// error middleware || next function

const errorMiddleware = (err, req, res, next) => {
  console.log(err);
  const defaultError = {
    statusCode: 500,
    message: err,
  };
  //missing filled error
  if (err.name === "validationError") {
    defaultError.statusCode = 400;
    defaultError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }
  //duplicate error
  if (err.code && err.code === 11000) {
    defaultError.statusCode = 400;
    defaultError.message = `${Object.keys(
      err.keyValue
    )} field has to be unique`;
  }
  res.status(defaultError.statusCode).json({ message: defaultError.message });
};

export default errorMiddleware;
