import { Router } from "express";
import { getMe } from "../controller/auth.controller";
const router = Router()

router.get('/me' , getMe)



export default router;