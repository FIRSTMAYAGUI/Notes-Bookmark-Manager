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
