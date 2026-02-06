import { neon } from '@neondatabase/serverless';

export const sql = neon(process.env.DATABASE_URL);

export async function getPgVersion() {
   try {
        const result = await sql`SELECT version()`;
        console.log(result[0]);
    } catch (error) {
        console.log('error', error.message)
    }
}