import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { getSummary, summarizeMessage } from "../controller/ai.controller";

const router = Router();

router.post("/:messageId/summary", isAuthenticated, summarizeMessage);

router.get('/:id' , isAuthenticated , getSummary)

export default router;
