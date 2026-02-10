import 'dotenv/config.js';
import express from "express";
import { getPgVersion } from "./config/db.js";
import { createNotes, createNotesTable, getNotes } from './models/notes.js';

const app = express();
app.use(express.json());/* allows us to accept json data in the request body (in req.body). Without this
you won't be able to do this "const { name, price, image } = req.body" */

const APP_PORT = process.env.APP_PORT || 5000;

app.listen(APP_PORT, ()=>{
    console.log(getPgVersion());
    createNotesTable();
    console.log("Server running at http://localhost:" + APP_PORT);
});

//without using app.use("/api/notes", notesRoutes);
app.post('/api/notes', async (req, res) =>{
    const { title, content } =  req.body; //data comming from the frontend
    const tags = Array.isArray(req.body.tags) ? req.body.tags : [];

    if (!title || !content){
        return res.status(400).json({success: false, message: 'Please fill in all fields'});
    }

    try {
        await createNotes(title, content, tags);
        const notes = await getNotes();
        return res.status(201).json({success: true, data: notes, message: 'Notes created successfully'});
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({success: false, message: 'Server Error'});
    }
})