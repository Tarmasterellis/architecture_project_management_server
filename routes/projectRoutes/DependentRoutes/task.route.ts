// Express
import express from "express";
import { authorizeRoles, isAuthenticated } from "../../../middleware/auth";
// Custom Controllers
import { getAllTaskOfProject, getTaskOfProject, createTask, updateTask, deleteTask } from "../../../controllers/projectController/DependentControllers/task.controller";

const taskRouter = express.Router();

const Append = '/task';
const deleteAppend = '/delete';

// Get Requests
taskRouter.get(`${Append}/:id`, isAuthenticated, authorizeRoles("admin", "lead", "manager"), getTaskOfProject);
taskRouter.get(`${Append}/get/all`, isAuthenticated, authorizeRoles("admin", "lead", "manager"), getAllTaskOfProject);

// Post Requests
taskRouter.post(`${Append}/create`, isAuthenticated, authorizeRoles("admin", "lead", "manager"), createTask);

// Put Requests
taskRouter.put(`${Append}/edit/:id`, isAuthenticated, authorizeRoles("admin", "lead", "manager"), updateTask);

// Delete Request
taskRouter.delete(`${Append + deleteAppend}/:id`, isAuthenticated, authorizeRoles("admin", "lead", "manager"), deleteTask); 

export default taskRouter;