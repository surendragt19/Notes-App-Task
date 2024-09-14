"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteController = void 0;
const noteModel_1 = require("../models/noteModel");
class NoteController {
    static async getAllNotes(req, res) {
        try {
            const notes = await noteModel_1.NoteModel.getAllNotes();
            res.render('index', { notes });
        }
        catch (err) {
            console.error(err);
            res.status(500).send('Database error');
        }
    }
    static async addNote(req, res) {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.redirect('/');
        }
        try {
            await noteModel_1.NoteModel.addNote(title, content);
            res.redirect('/');
        }
        catch (err) {
            console.error(err);
            res.status(500).send('Database error');
        }
    }
    static async deleteNoteById(req, res) {
        const { id } = req.params;
        const noteId = Number(id);
        if (isNaN(noteId)) {
            return res.redirect('/');
        }
        try {
            await noteModel_1.NoteModel.deleteNoteById(noteId);
            res.redirect('/');
        }
        catch (err) {
            console.error(err);
            res.status(500).send('Database error');
        }
    }
    static async getEditNotePage(req, res) {
        const { id } = req.params;
        const noteId = Number(id);
        if (isNaN(noteId)) {
            return res.redirect('/');
        }
        try {
            const notes = await noteModel_1.NoteModel.getAllNotes();
            const note = notes.find(n => n.id === noteId);
            if (note) {
                res.render('edit', { note });
            }
            else {
                res.redirect('/');
            }
        }
        catch (err) {
            console.error(err);
            res.status(500).send('Database error');
        }
    }
    static async updateNoteById(req, res) {
        const { id } = req.params;
        const { title, content } = req.body;
        const noteId = Number(id);
        if (!title || !content || isNaN(noteId)) {
            return res.redirect(`/edit/${id}`);
        }
        try {
            await noteModel_1.NoteModel.updateNoteById(noteId, title, content);
            res.redirect('/');
        }
        catch (err) {
            console.error(err);
            res.status(500).send('Database error');
        }
    }
}
exports.NoteController = NoteController;
