// Express
import express from "express";
import { authorizeRoles, isAuthenticated } from "../../middleware/auth";
// Custom Controllers
import { getAllProjectsOfUser, createProject, updateProject, deleteProject, getProjectOfUser } from "../../controllers/projectController/project.controller";

const projectRouter = express.Router();

const Append = '/project';
const deleteAppend = '/delete';

// Get Requests
projectRouter.get(`${Append}/get/:id`, isAuthenticated, authorizeRoles("admin", "lead", "manager"), getProjectOfUser);
projectRouter.get(`${Append}/all`, isAuthenticated, authorizeRoles("admin", "lead", "manager"), getAllProjectsOfUser);

// Post Requests
projectRouter.post(`${Append}/create`, isAuthenticated, authorizeRoles("admin", "lead", "manager"), createProject);

// Put Requests
projectRouter.put(`${Append}/edit/`, isAuthenticated, authorizeRoles("admin", "lead", "manager"), updateProject);

// Delete Request
projectRouter.delete(`${Append + deleteAppend}/:id`, isAuthenticated, authorizeRoles("admin", "lead", "manager"), deleteProject); 

export default projectRouter;