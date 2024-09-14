import { Router } from 'express';
import { NoteController } from '../controller/noteController';

const router = Router();

router.get('/', NoteController.getAllNotes);
router.post('/add', NoteController.addNote);
router.post('/delete/:id', NoteController.deleteNoteById);
router.get('/edit/:id', NoteController.getEditNotePage);
router.post('/edit/:id', NoteController.updateNoteById);

export default router;
