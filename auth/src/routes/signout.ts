import express from "express";
const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  req.session = null;
  res.status(200).json({
    data: null,
    message: "user is signed out successfully",
    success: true,
  });
});

export { router as signoutRouter };
