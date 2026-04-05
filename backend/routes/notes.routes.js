import express from "express";
import { createNote, removeNote, getAllNotes, editNote, getNote } from "../controllers/notes.controller.js";

const router = express.Router()

router.post('/', createNote);
router.get('/', getAllNotes);
router.get('/:id', getNote);
router.put('/:id', editNote);
router.delete('/:id', removeNote);

export default router