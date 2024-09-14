"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteModel = void 0;
const mariadb_1 = __importDefault(require("mariadb"));
const pool = mariadb_1.default.createPool({
    host: 'localhost',
    user: 'root',
    password: '6878',
    database: 'enotes',
    connectionLimit: 5,
});
class NoteModel {
    static async getAllNotes() {
        let conn;
        try {
            conn = await pool.getConnection();
            return await conn.query('SELECT * FROM notes');
        }
        catch (err) {
            throw new Error('Database query error');
        }
        finally {
            if (conn)
                conn.release();
        }
    }
    static async addNote(title, content) {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query('INSERT INTO notes (title, content) VALUES (?, ?)', [title, content]);
        }
        catch (err) {
            throw new Error('Database query error');
        }
        finally {
            if (conn)
                conn.release();
        }
    }
    static async deleteNoteById(id) {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query('DELETE FROM notes WHERE id = ?', [id]);
        }
        catch (err) {
            throw new Error('Database query error');
        }
        finally {
            if (conn)
                conn.release();
        }
    }
    static async updateNoteById(id, title, content) {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query('UPDATE notes SET title = ?, content = ? WHERE id = ?', [title, content, id]);
        }
        catch (err) {
            throw new Error('Database query error');
        }
        finally {
            if (conn)
                conn.release();
        }
    }
}
exports.NoteModel = NoteModel;
