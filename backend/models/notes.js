import { sql } from "../config/db.js";

export const createNotesTable = async () => {
  try {
    await sql`
    CREATE TABLE IF NOT EXISTS notes (
      id BIGSERIAL PRIMARY KEY,

      title TEXT NOT NULL,
      content TEXT NOT NULL,
      tags TEXT[] DEFAULT '{}',
      is_favorite BOOLEAN DEFAULT FALSE,

      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
    `;

    console.log('table created')
  } catch (error) {
    console.log('error:', error)
    return error.message
  }
}

export const createNotes = async (title, content, tags = []) => {
  try {
    const createdNote = await sql`
      INSERT INTO notes (title, content, tags)
      VALUES (${title}, ${content}, ${tags}::text[]) 
      RETURNING *;
    `; //The ::text[] is to make postgre cast the tags as an array

    return createdNote[0];
  } catch (error) {
    throw new Error(error.message);
  }
}

export const getNotes = async () => {
  try {
    const notesList = await sql`
      SELECT * FROM notes;
    `;
    return notesList;
  } catch (error) {
    return error.message;
  }
}