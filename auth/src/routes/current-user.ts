import express from "express";
import { verify } from "jsonwebtoken";
import { BadRequestError } from "../errors/bad-request-error";
import { User } from "../models/user";
const router = express.Router();

router.get("/api/users/currentuser", async (req, res) => {
  if (!req.session?.jwt) {
    return res.status(200).json({
      data: null,
      message: "current user is fetched successfully",
      success: true,
    });
  }

  const payload = verify(req.session.jwt, process.env.JWT_KEY!);
  const { email, id } = payload as { email: string; id: string };
  const user = await User.findById(id);

  if (!user) {
    throw new BadRequestError("User not found");
  }

  if (user.email !== email) {
    throw new BadRequestError("Invalid credentials");
  }

  res.status(200).json({
    data: {
      currentUser: user,
    },
    message: "current user is fetched successfully",
    success: true,
  });
});

export { router as currentUserRouter };
