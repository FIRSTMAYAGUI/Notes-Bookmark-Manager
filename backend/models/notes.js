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