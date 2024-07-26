import { Router } from "express";
import { createCookie, createToken } from "../repository/userCollection";
import AuthMiddleware from "../middleware/authMiddleware";
import { RequestWithUser } from "../entities/user.interface";
import { getUser, signIn, signUp } from "../controller/api";
const router: Router = Router();
router.get("/", (req, res, next) => {
  res.status(200).json({ code: 200, data: "Welcome. Server is running" });
});

// router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.get("/me", AuthMiddleware, getUser);
export default router;
