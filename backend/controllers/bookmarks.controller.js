import { deleteBookMark, isIdValid, updateBookMark, AddBookMarks, findAllBookMarks, findABookMark, findBookmarkByUrl } from "../models/bookmarks.js";


export const createBookMark = async (req, res) =>{
    let { title, url, description } =  req.body; //data comming from the frontend

    title = title?.trim();
    url = url?.trim();
    description = description?.trim();

    if (!title || !url) {
        return res.status(400).json({ message: "Please fill in all fields" });
    }

    try {
        new URL(url);
    } catch (err) {
        return res.status(400).json({ message: "Invalid URL format" });
    }

    const existingUrl = await findBookmarkByUrl(url);
    if (existingUrl.length > 0) {
        return res.status(409).json({ message: "Bookmark already exists" });
    }

    try { 
        const newBookmarks = await AddBookMarks(url, title, description);
        return res.status(201).json({success: true, data: newBookmarks, message: 'Bookmarks created successfully'});
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({success: false, message: 'Internal server Error'});
    }
}

export const getAllBookMarks = async(req, res) => {
    try {
        const bookmarks = await findAllBookMarks();
        return res.status(200).json({success: true, data: bookmarks, message: 'Bookmarks fetched'});
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server error'});
        console.log(`Error ${error}`);
    }
}

export const editBookMark = async (req, res) => {
    const {id} = req.params;
    let { title, url, description} = req.body;
    const validId = await isIdValid(id)
    console.log("validId = ", validId)

    if(validId.length === 0){
        return res.status(404).json({success: false, message: 'Bookmark not found'});
    }

    title = title?.trim();
    url = url?.trim();
    description =  description?.trim();

    if (!title || !url) {
        return res.status(400).json({ message: "Please fill in all fields" });
    }

    try {
        new URL(url);
    } catch (err) {
        return res.status(400).json({ message: "Invalid URL format" });
    }

    const existingBookmark = await findABookMark(id);
    // console.log(existingBookmark[0]);
    // console.log(existingBookmark[0].title);
    // return res.status(200).json({ message: existingBookmark[0].title});

    const updatedTitle = title ?? existingBookmark[0].title;
    const updatedUrl = url ?? existingBookmark[0].url;
    const updatedDescription = description ?? existingBookmark[0].description;

    try {
        const updatedBookmark = await updateBookMark(id, updatedUrl, updatedTitle, updatedDescription);
        console.log(updatedBookmark);
        return res.status(200).json({success: true, data: updatedBookmark, message: 'Bookmark updated'});
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server error'});
        console.log(`Error ${error}`);
    }
}

export const removeBookMark = async (req, res) => {
    const {id} = req.params;
    const validId = await isIdValid(id)
    console.log("validId = ", validId)

    if(validId.length === 0){
        return res.status(404).json({success: false, message: 'Bookmark not found'});
    }

    try {
        await deleteBookMark(id);
        return res.status(204).json({success: true, message: 'Bookmark deleted'});
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server error'});
        console.log(`Error ${error}`);
    }
}

export const getABookMark = async(req, res) => {
    const {id} = req.params;
    const validId = await isIdValid(id)
    console.log("validId = ", validId)

    if(validId.length === 0){
        return res.status(404).json({success: false, message: 'Bookmark not found'});
    }

    try {
        const bookmark = await findABookMark(id);
        return res.status(200).json({success: true, data: bookmark, message: 'Bookmark fetched'});
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server error'});
        console.log(`Error ${error}`);
    }
}