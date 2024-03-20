// Express
import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
// Custom Controllers
import { getAllStickyNotesOfUser, createStickyNote, updateStickyNote, deleteStickyNote } from "../controllers/stickyNotes.controller";

const stickyNoteRouter = express.Router();

const Append = '/sticky-note';
const deleteAppend = '/delete';

// Get Requests
stickyNoteRouter.get(`${Append}/all`, isAuthenticated, getAllStickyNotesOfUser);

// Post Requests
stickyNoteRouter.post(`${Append}/create`, isAuthenticated, createStickyNote);

// Put Requests
stickyNoteRouter.put(`${Append}/edit`, isAuthenticated, updateStickyNote);

// Delete Request
stickyNoteRouter.delete(`${Append + deleteAppend}/:id`, isAuthenticated, deleteStickyNote); 

export default stickyNoteRouter;