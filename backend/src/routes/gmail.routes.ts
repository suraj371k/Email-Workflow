import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import {
  getMessageById,
  getMessages,
  getLabels,
} from "../controller/gmail.controller";

const router = Router();

router.get("/labels", isAuthenticated, getLabels);

router.get("/messages", isAuthenticated, getMessages);

router.get("/message/:messageId", isAuthenticated, getMessageById);

export default router;
