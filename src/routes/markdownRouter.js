import { Router } from "express";
import authentication from "../middlewares/authentication.js";
import markdownSchema from "../schemas/markdownSchema.js";
import { createMarkdown, getMarkdown } from "../controllers/markdownController.js";

const markdownRouter = Router();

markdownRouter.post('/notas',authentication,markdownSchema,createMarkdown);
markdownRouter.get('/notas',authentication,getMarkdown);
markdownRouter.delete('/notas/:id');
markdownRouter.patch('/notas/:id');

export default markdownRouter;