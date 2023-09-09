import { ErrorRequestHandler } from "express";
import { CustomError } from "../errors/custom-error";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      data: null,
      errors: err.seralizeErrors(),
      message: err.message,
      success: false,
    });
  }

  res.status(400).json({
    data: null,
    message: err.message,
    success: false,
    errors: [
      {
        message: err.message,
      },
    ],
  });
};

export { errorHandler };
