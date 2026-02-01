import express from "express";
import { deleteEvidence, getAllEvidence, newEvidence, updateEvidence } from "../controllers/evidenceControllers.js";
const router = express.Router();

router.get("/", getAllEvidence);
router.post("/", newEvidence);
router.put("/:id", updateEvidence);
router.delete("/:id", deleteEvidence);

export default router;