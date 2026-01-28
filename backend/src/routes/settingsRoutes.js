import express from "express";
import { getSettings, newSettings, startEvent, pauseEvent, resumeEvent, resetEvent, updatePhase } from "../controllers/settingsControllers.js";
import { start } from "node:repl";
const router = express.Router();

router.post("/", newSettings);
router.get("/", getSettings);
router.put("/start", startEvent);
router.put("/pause", pauseEvent);
router.put("/resume", resumeEvent);
router.put("/reset", resetEvent);
router.put("/phase", updatePhase);

export default router;