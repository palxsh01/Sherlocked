import express from "express"
import { getAllSuspects, getSuspect, newSuspect, updateSuspect, deleteSuspect } from "../controllers/suspectControllers.js";
const router = express.Router();

router.get("/", getAllSuspects);
router.get("/:id", getSuspect);
router.post("/", newSuspect);
router.put("/:id", updateSuspect);
router.delete("/:id", deleteSuspect);

export default router;