import { Router } from "express";
import authRouter from "./authRouter.js";
import markdownRouter from "./markdownRouter.js";

const router = Router();

router.use(authRouter);
router.use(markdownRouter);

export default router;