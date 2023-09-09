import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    let user = User.build({ email, password });
    user = await user.save();

    // generate jwt
    const userJwt = user.generateAuthToken();

    // store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).json({
      data: { ...user.toJSON(), token: userJwt },
      message: "user created successfully",
      success: true,
    });
  }
);

export { router as signupRouter };
