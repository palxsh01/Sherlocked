import express from "express";
import { getAllSuspects, newSuspect, updateSuspect, deleteSuspect } from "../controllers/suspectControllers.js";
const router = express.Router();

router.get("/", getAllSuspects);
router.post("/", newSuspect);
router.put("/:id", updateSuspect);
router.delete("/:id", deleteSuspect);

export default router;