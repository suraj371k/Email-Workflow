import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import {
  getMessageById,
  getMessages,
  getLabels,
  createDraft,
  getDraft,
} from "../controller/gmail.controller";

const router = Router();

router.get("/labels", isAuthenticated, getLabels);

router.get("/messages", isAuthenticated, getMessages);

router.get("/message/:messageId", isAuthenticated, getMessageById);

router.post("/draft", isAuthenticated, createDraft);

router.get("/draft", isAuthenticated, getDraft);

export default router;
