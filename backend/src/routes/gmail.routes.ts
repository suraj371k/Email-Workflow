import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { getLabels, getMessages } from "../controller/gmail.controller";

const router = Router()


router.get('/labels' , isAuthenticated , getLabels)

router.get('/messages' , isAuthenticated , getMessages)

export default router;