import 'dotenv/config.js';
import express from "express";
import { getPgVersion } from "./config/db.js";
import { createNotes, createNotesTable, deleteNotes, getNote, getNotes, isValidId, updateNotes } from './models/notes.js';
import { createBookMarks, createBookmarkTable, deleteBookMark, getBookMark, getBookMarks } from './models/bookmarks.js';
import notesRoutes from './routes/notes.routes.js'
import bookMarksRoutes from './routes/bookmarks.routes.js'

const app = express();
app.use(express.json());/* allows us to accept json data in the request body (in req.body). Without this
you won't be able to do this "const { name, price, image } = req.body" */

const APP_PORT = process.env.APP_PORT || 5000;

app.listen(APP_PORT, ()=>{
    //console.log(getPgVersion());
    createNotesTable();
    createBookmarkTable();
    console.log("Server running at http://localhost:" + APP_PORT);
});



/* notes routes */
app.use("/api/notes", notesRoutes);

/* bookmarks routes */
app.use("/api/notes", bookMarksRoutes);