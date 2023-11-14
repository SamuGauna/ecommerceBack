import { Router } from "express";
import { sendMailEthereal, sendGmail } from "../controllers/emailController.js";

const router = Router()

router.post('/send', sendMailEthereal)
router.post('/sendgmail', sendGmail)

export default router