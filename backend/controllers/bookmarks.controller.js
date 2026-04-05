import { createBookMarks, deleteBookMark, getBookMarks, getBookMark, isValidId, updateBookMark } from "../models/bookmarks";


export const createBookMark = async (req, res) =>{
    const { title, url } =  req.body; //data comming from the frontend

    if (!title || !url){
        return res.status(400).json({success: false, message: 'Please fill in all fields'});
    }

    try {
        await createBookMarks(title, url);
        const Bookmarks = await getBookMarks();
        return res.status(201).json({success: true, data: Bookmarks, message: 'Bookmarks created successfully'});
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({success: false, message: 'Internal server Error'});
    }
}

export const getAllBookMarks = async(req, res) => {
    try {
        const Bookmarks = await getBookMarks();
        return res.status(200).json({success: true, data: Bookmarks, message: 'Bookmarks fetched'});
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server error'});
        console.log(`Error ${error}`);
    }
}

export const editBookMark = async (req, res) => {
    const {id} = req.params;
    const { title, url } = req.body;
    const validId = await isValidId(id)
    console.log("validId = ", validId)

    if(validId.length === 0){
        return res.status(404).json({success: false, message: 'Bookmark not found'});
    }

    try {
        const updatedBookmark = await updateBookMark(id, title, url);
        console.log(updatedBookmark);
        return res.status(200).json({success: true, data: updatedBookmark, message: 'Bookmark updated'});
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server error'});
        console.log(`Error ${error}`);
    }
}

export const removeBookMark = async (req, res) => {
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
}

export const getBookMark = async(req, res) => {
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
}