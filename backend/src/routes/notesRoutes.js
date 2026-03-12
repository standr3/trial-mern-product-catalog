import express from "express";
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

// router.post("/", (req, res) => {
//   res.status(201).json({ message: "note created successfully!" });
// });

// router.put("/:id", (req, res) => {
//   res.status(200).json({ message: "note updated successfully!" });
// });

// router.put("/:id", (req, res) => {
//   res.status(200).json({ message: "note deleted successfully!" });
// });

export default router;
