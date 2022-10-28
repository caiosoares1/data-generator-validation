import Database from '../db/database.js';

async function read(id) {
    const db = await Database.connect();

    const sql = `
    SELECT 
        data
    FROM
        generated 
    WHERE 
        userid = ?
    `;

    const data= await db.all(sql, [id]);

    return data;
};

export default {read};