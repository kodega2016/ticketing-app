import express from "express";
const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
  res.status(200).json({
    data: null,
    message: "current user is fetched successfully",
    success: true,
  });
});

export { router as currentUserRouter };
