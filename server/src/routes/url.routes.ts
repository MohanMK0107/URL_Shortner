import { Router } from "express";
import { createShortUrl } from "../controllers/url.controller.ts";

const router = Router();

router.post('/generate-url', createShortUrl);

export default router;