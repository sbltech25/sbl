import express from "express";
import { login, logout, signup, adminlogin, getUsers } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/alogin", adminlogin);
router.post("/logout", logout);
router.get("/getall", getUsers);



router.get("/me",protectRoute, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

export default router;
