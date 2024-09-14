import { Request, Response } from 'express';
import { NoteModel } from '../models/noteModel';

export class NoteController {
  static async getAllNotes(req: Request, res: Response) {
    try {
      const notes = await NoteModel.getAllNotes();
      res.render('index', { notes });
    } catch (err) {
      console.error(err);
      res.status(500).send('Database error');
    }
  }

  static async addNote(req: Request, res: Response) {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.redirect('/');
    }

    try {
      await NoteModel.addNote(title, content);
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).send('Database error');
    }
  }

  static async deleteNoteById(req: Request, res: Response) {
    const { id } = req.params;
    const noteId = Number(id); 
    if (isNaN(noteId)) {
      return res.redirect('/');
    }

    try {
      await NoteModel.deleteNoteById(noteId);
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).send('Database error');
    }
  }

  static async getEditNotePage(req: Request, res: Response) {
    const { id } = req.params;
    const noteId = Number(id); 
    if (isNaN(noteId)) {
      return res.redirect('/');
    }

    try {
      const notes = await NoteModel.getAllNotes();
      const note = notes.find(n => n.id === noteId);
      if (note) {
        res.render('edit', { note });
      } else {
        res.redirect('/');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Database error');
    }
  }

  static async updateNoteById(req: Request, res: Response) {
    const { id } = req.params;
    const { title, content } = req.body;
    const noteId = Number(id); 
    if (!title || !content || isNaN(noteId)) {
      return res.redirect(`/edit/${id}`);
    }

    try {
      await NoteModel.updateNoteById(noteId, title, content);
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).send('Database error');
    }
  }
}
