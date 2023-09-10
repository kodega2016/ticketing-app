import express from "express";
import { currentUser } from "../middlewares/current-user";
const router = express.Router();

router.get("/api/users/currentuser", currentUser, async (req, res) => {
  res.status(200).json({
    data: {
      currentUser: req.currentUser || null,
    },
    message: "current user is fetched successfully",
    success: true,
  });
});

export { router as currentUserRouter };
