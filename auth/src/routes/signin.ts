import express from "express";
const router = express.Router();

router.post("/api/users/signin", (req, res) => {
  res.status(200).json({
    data: null,
    message: "user is logged in successfully",
    success: true,
  });
});

export { router as signinRouter };
