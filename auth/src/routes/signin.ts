import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
import { Password } from "./../services/password";
const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email }).select("+password");

    if (!existingUser) {
      throw new BadRequestError("account not found with this email");
    }
    const isPasswordMatch = Password.compare(existingUser.password, password);
    if (!isPasswordMatch) {
      throw new BadRequestError("invalid credentials");
    }

    const userJwt = existingUser.generateAuthToken();

    res.status(200).json({
      data: {
        ...existingUser.toJSON(),
        token: userJwt,
      },
      message: "user is logged in successfully",
      success: true,
    });
  }
);

export { router as signinRouter };
