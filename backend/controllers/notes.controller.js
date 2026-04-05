import { createNotes, deleteNotes, getNotes, getNote, isValidId, updateNotes } from "../models/notes";

export const createNote = async (req, res) =>{
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
        return res.status(500).json({success: false, message: 'Internal server Error'});
    }
}

export const getAllNotes = async(req, res) => {
    try {
        const notes = await getNotes();
        return res.status(200).json({success: true, data: notes, message: 'Notes fetched'});
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server error'});
        console.log(`Error ${error}`);
    }
}

export const editNote = async (req, res) => {
    const {id} = req.params;
    const { title, content } = req.body;
    const tags = Array.isArray(req.body.tags) ? req.body.tags : [];
    const validId = await isValidId(id)
    console.log("validId = ", validId)

    if(validId.length === 0){
        return res.status(404).json({success: false, message: 'Note not found'});
    }

    try {
        const updatedNotes = await updateNotes(id, title, content, tags);
        console.log(updatedNotes);
        return res.status(200).json({success: true, data: updatedNotes, message: 'Note updated'});
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server error'});
        console.log(`Error ${error}`);
    }
}

export const removeNote = async (req, res) => {
    const {id} = req.params;
    const validId = await isValidId(id)
    console.log("validId = ", validId)

    if(validId.length === 0){
        return res.status(404).json({success: false, message: 'Notes not found'});
    }

    try {
        await deleteNotes(id);
        return res.status(200).json({success: true, message: 'Notes deleted'});
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server error'});
        console.log(`Error ${error}`);
    }
}

export const getNote = async(req, res) => {
    const {id} = req.params;
    const validId = await isValidId(id)
    console.log("validId = ", validId)

    if(validId.length === 0){
        return res.status(404).json({success: false, message: 'Note not found'});
    }

    try {
        const note = await getNote(id);
        return res.status(200).json({success: true, data: note, message: 'Notes fetched'});
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server error'});
        console.log(`Error ${error}`);
    }
}