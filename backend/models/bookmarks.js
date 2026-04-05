import { sql } from "../config/db.js";

export const createBookmarkTable = async () => {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS bookmarks (
        id BIGSERIAL PRIMARY KEY,

        url TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        description TEXT,

        is_favorite BOOLEAN DEFAULT FALSE,

        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    console.log("Bookmarks table created");
  } catch (error) {
    console.error("Error creating bookmarks table:", error.message);
  }
};

export const createBookMarks = async (url, title) => {
  try {
    const createdBookMarks = await sql`
      INSERT INTO bookmarks (url, title)
      VALUES (${title}, ${content}) 
      RETURNING *;
    `; //The ::text[] is to make postgre cast the tags as an array

    return createdBookMarks[0];
  } catch (error) {
    throw new Error(error.message);
  }
}

export const isValidId = async (id) => {
  try {
    const Id = await sql`
      SELECT id FROM bookmarks WHERE id = ${id}
    `
    //console.log("valid Id:", Id)
    return Id
  } catch (error) {
    //console.log("Id not valid")
    return error.message
  }
}

export const getBookMarks = async () => {
  try {
    const bookMarks = await sql`
      SELECT * FROM bookmarks;
    `;
    return bookMarks;
  } catch (error) {
    return error.message;
  }
}

export const updateBookMark = async (id, url, title, tags) => {
  try {
    const updated = await sql`
      UPDATE bookmarks
      SET url=${url}, title=${title}, tags=${tags}
      WHERE id=${id}
      RETURNING *
    `
    return updated
  } catch (error) {
    console.log("Id not found") 
    return error.message
  }
}

export const deleteBookMark = async (id) => {
  try {
    const deletedBookMark = await sql`
      DELETE FROM bookmarks WHERE id = ${id}
    `
    return deletedBookMark
  } catch (error) {
    console.log("Id not found")
    return error.message
  }
}

export const getBookMark = async (id) => {
  try {
    const bookMark = await sql`
      SELECT * FROM bookmarks WHERE id = ${id};
    `;
    return bookMark;
  } catch (error) {
    return error.message;
  }
}
