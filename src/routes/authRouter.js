import { Router } from "express";
import registerSchema from "../schemas/registerSchema.js";
import { signIn,signUp } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post('/sign-in',signIn);
authRouter.post('/sign-up',registerSchema,signUp);

export default authRouter;