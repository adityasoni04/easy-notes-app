import { Router } from 'express';
import { createNote, getNotes, searchNotes, updateNote, deleteNote } from '../controllers/noteController.js';
import { authenticate } from '../middleware/authMiddleware.js';
const router = Router();

router.use(authenticate);
router.post('/', createNote);
router.get('/', getNotes);
router.get('/search', searchNotes);
router.put('/:id', updateNote);   
router.delete('/:id', deleteNote);

export default router;