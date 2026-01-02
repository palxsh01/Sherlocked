import express from "express"
import { getDefault } from "../controllers/sherlockedControllers.js";
const router = express.Router();

router.get("/", getDefault);
// router.get("/:id", getNote);
// router.post("/", newNote);
// router.put("/:id", updateNote);
// router.delete("/:id", deleteNote);

export default router;