import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import {
  getMessageById,
  getMessages,
  getLabels,
  createDraft,
  sendEmail,
  toggleStar,
  markAsRead,
} from "../controller/gmail.controller";

const router = Router();

router.get("/labels", isAuthenticated, getLabels);

router.get("/messages", isAuthenticated, getMessages);

router.get("/message/:messageId", isAuthenticated, getMessageById);

router.post("/draft", isAuthenticated, createDraft);

router.post("/send", isAuthenticated, sendEmail);

router.post("/message/:messageId/star", isAuthenticated, toggleStar);

router.post("/message/:messageId/read", isAuthenticated, markAsRead);

export default router;
