// Express
import express from "express";
// Custom Controllers
import { getAllStickyNotesOfUser, createStickyNote, updateStickyNote, deleteStickyNote } from "../controllers/stickyNotes.controller";

const stickyNoteRouter = express.Router();

const Append = '/sticky-note';
const deleteAppend = '/delete';

// Get Requests
stickyNoteRouter.get(`${Append}/all`, getAllStickyNotesOfUser);

// Post Requests
stickyNoteRouter.post(`${Append}/create`, createStickyNote);

// Put Requests
stickyNoteRouter.put(`${Append}/edit`, updateStickyNote);

// Delete Request
stickyNoteRouter.delete(`${Append + deleteAppend}/:id`, deleteStickyNote); 

export default stickyNoteRouter;