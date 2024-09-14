import mariadb from 'mariadb';

// Define the Note type
interface Note {
  id: number;
  title: string;
  content: string;
}

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: '6878', 
  database: 'enotes', 
  connectionLimit: 5,
});

export class NoteModel {
  static async getAllNotes(): Promise<Note[]> {
    let conn;
    try {
      conn = await pool.getConnection();
      return await conn.query('SELECT * FROM notes') as Note[];
    } catch (err) {
      throw new Error('Database query error');
    } finally {
      if (conn) conn.release();
    }
  }

  static async addNote(title: string, content: string): Promise<void> {
    let conn;
    try {
      conn = await pool.getConnection();
      await conn.query('INSERT INTO notes (title, content) VALUES (?, ?)', [title, content]);
    } catch (err) {
      throw new Error('Database query error');
    } finally {
      if (conn) conn.release();
    }
  }

  static async deleteNoteById(id: number): Promise<void> {
    let conn;
    try {
      conn = await pool.getConnection();
      await conn.query('DELETE FROM notes WHERE id = ?', [id]);
    } catch (err) {
      throw new Error('Database query error');
    } finally {
      if (conn) conn.release();
    }
  }

  static async updateNoteById(id: number, title: string, content: string): Promise<void> {
    let conn;
    try {
      conn = await pool.getConnection();
      await conn.query('UPDATE notes SET title = ?, content = ? WHERE id = ?', [title, content, id]);
    } catch (err) {
      throw new Error('Database query error');
    } finally {
      if (conn) conn.release();
    }
  }
}
