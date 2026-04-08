import express from "express";
import { createBookMark, removeBookMark, getAllBookMarks, getABookMark, editBookMark } from "../controllers/bookmarks.controller.js";

const router = express.Router()

router.post('/', createBookMark);
router.get('/', getAllBookMarks);
router.get('/:id', getABookMark);
router.put('/:id', editBookMark);
router.delete('/:id', removeBookMark);

export default router