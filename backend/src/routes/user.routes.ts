import { Router } from "express";
import { getMe } from "../controller/user.controller";
const router = Router()

router.get('/me' , getMe)



export default router;