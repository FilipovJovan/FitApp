import mysql from "mysql2/promise";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,

    //remote connection
    /*host: process.env.DB_REMOTE_HOST,
    user: process.env.DB_REMOTE_USER,
    password: process.env.DB_REMOTE_PASS,
    database: process.env.DB_REMOTE_DATABASE,*/
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});