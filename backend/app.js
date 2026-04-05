import 'dotenv/config.js';
import express from "express";
import { getPgVersion } from "./config/db.js";
import { createNotes, createNotesTable, deleteNotes, getNote, getNotes, isValidId, updateNotes } from './models/notes.js';
import { createBookMarks, createBookmarkTable, deleteBookMark, getBookMark, getBookMarks } from './models/bookmarks.js';
import notesRoutes from './routes/notes.routes.js'

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
app.post('/api/bookmarks', async (req, res) =>{
    const { title, content } =  req.body; //data comming from the frontend
    const tags = Array.isArray(req.body.tags) ? req.body.tags : [];

    if (!title || !content){
        return res.status(400).json({success: false, message: 'Please fill in all fields'});
    }

    try {
        await createBookMarks(title, content, tags);
        const Bookmarks = await getBookMarks();
        return res.status(201).json({success: true, data: Bookmarks, message: 'Bookmarks created successfully'});
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({success: false, message: 'Internal server Error'});
    }
})

app.get('/api/Bookmarks', async(req, res) => {
    try {
        const Bookmarks = await getBookMarks();
        return res.status(200).json({success: true, data: Bookmarks, message: 'Bookmarks fetched'});
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server error'});
        console.log(`Error ${error}`);
    }
})

app.put('/api/bookmarks/:id', async (req, res) => {
    const {id} = req.params;
    const { title, content } = req.body;
    const tags = Array.isArray(req.body.tags) ? req.body.tags : [];
    const validId = await isValidId(id)
    console.log("validId = ", validId)

    if(validId.length === 0){
        return res.status(404).json({success: false, message: 'Bookmark not found'});
    }

    try {
        const updatedBookmark = await updateBookmarks(id, title, content, tags);
        console.log(updatedBookmark);
        return res.status(200).json({success: true, data: updatedBookmark, message: 'Bookmark updated'});
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server error'});
        console.log(`Error ${error}`);
    }
})

app.delete('/api/bookmarks/:id', async (req, res) => {
    const {id} = req.params;
    const validId = await isValidId(id)
    console.log("validId = ", validId)

    if(validId.length === 0){
        return res.status(404).json({success: false, message: 'Bookmark not found'});
    }

    try {
        await deleteBookMark(id);
        return res.status(200).json({success: true, message: 'Bookmark deleted'});
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server error'});
        console.log(`Error ${error}`);
    }
})

app.get('/api/bookmarks/:id', async(req, res) => {
    const {id} = req.params;
    const validId = await isValidId(id)
    console.log("validId = ", validId)

    if(validId.length === 0){
        return res.status(404).json({success: false, message: 'Bookmark not found'});
    }

    try {
        const note = await getBookMark(id);
        return res.status(200).json({success: true, data: note, message: 'Bookmark fetched'});
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server error'});
        console.log(`Error ${error}`);
    }
})