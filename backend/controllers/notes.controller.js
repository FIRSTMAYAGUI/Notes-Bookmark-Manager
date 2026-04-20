import { AddNotes, deleteNote, findAllNotes, findANote, isIdValid, updateNotes } from "../models/notes.js";

export const createNote = async (req, res) =>{
    const { title, content } =  req.body; //data comming from the frontend
    const tags = Array.isArray(req.body.tags) ? req.body.tags : [];

    if (!title || !content){
        return res.status(400).json({success: false, message: 'Please fill in all fields'});
    }

    try {
        const notes = await AddNotes(title, content, tags);
        return res.status(201).json({success: true, data: notes, message: 'Notes created successfully'});
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({success: false, message: 'Internal server Error'});
    }
}

export const getAllNotes = async(req, res) => {
    try {
        const notes = await findAllNotes();
        return res.status(200).json({success: true, data: notes, message: 'Notes fetched'});
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server error'});
        console.log(`Error ${error}`);
    }
}

export const editNote = async (req, res) => {
    const {id} = req.params;
    let { title, content } = req.body;
    const tags = Array.isArray(req.body.tags) ? req.body.tags : [];
    const validId = await isIdValid(id)
    console.log("validId = ", validId)

    if(validId.length === 0){
        return res.status(404).json({success: false, message: 'Note not found'});
    }

    title= title?.trim();
    content =  content?.trim();

    if (!title || !content) {
        return res.status(400).json({ message: "Please fill in all fields" });
    }

    const existingNote = await findABookMark(id);
    // console.log(existingNote[0]);
    // console.log(existingNote[0].title);
    // return res.status(200).json({ message: existingNote[0].title});

    const updatedTitle = title ?? existingNote[0].title;
    const updatedContent = content ?? existingNote[0].content;
    const updatedTags = tags ?? existingNote[0].tags;

    try {
        const updatedNote = await updateNotes(id, updatedTitle, updatedContent, updatedTags);
        console.log(updatedNote);
        return res.status(200).json({success: true, data: updatedNote, message: 'Note updated'});
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server error'});
        console.log(`Error ${error}`);
    }
}

export const removeNote = async (req, res) => {
    const {id} = req.params;
    const validId = await isIdValid(id)
    console.log("validId = ", validId)

    if(validId.length === 0){
        return res.status(404).json({success: false, message: 'Notes not found'});
    }

    try {
        await deleteNote(id);
        return res.status(204).json({success: true, message: 'Notes deleted'});
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server error'});
        console.log(`Error ${error}`);
    }
}

export const getANote = async(req, res) => {
    const {id} = req.params;
    const validId = await isIdValid(id)
    console.log("validId = ", validId)

    if(validId.length === 0){
        return res.status(404).json({success: false, message: 'Note not found'});
    }

    try {
        const note = await findANote(id);
        return res.status(200).json({success: true, data: note, message: 'Notes fetched'});
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server error'});
        console.log(`Error ${error}`);
    }
}