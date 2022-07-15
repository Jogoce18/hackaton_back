import { Router } from "express";
import authentication from "../middlewares/authentication.js";
import markdownSchema from "../schemas/markdownSchema.js";
import { createMarkdown, deleteMarkdown, getMarkdown, editMarkdown } from "../controllers/markdownController.js";

const markdownRouter = Router();

markdownRouter.post('/notas',authentication,markdownSchema,createMarkdown);
markdownRouter.get('/notas',authentication,getMarkdown);
markdownRouter.delete('/notas/:id',authentication,deleteMarkdown);
markdownRouter.patch('/notas/:id',authentication,editMarkdown);

export default markdownRouter;