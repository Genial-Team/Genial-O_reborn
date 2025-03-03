import { createPool } from 'mysql2/promise';
import path from 'node:path';
import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '../../../.env.developement.developement') });

const pool = createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string, 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const init = async () => {
    try {
        const connection = await pool.getConnection();
        global.logger.info(`Connected to database: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
        connection.release(); // Release the connection back to the pool
        return pool;
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

export default init;
export { pool };