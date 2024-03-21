// Express
import express from "express";
import { authorizeRoles, isAuthenticated } from "../../../middleware/auth";
// Custom Controllers
import { getAllTypeOfProject, getTypeOfProject, createType, updateType, deleteType } from "../../../controllers/projectController/DependentControllers/type.controller";

const typeRouter = express.Router();

const Append = '/type';
const deleteAppend = '/delete';

// Get Requests
typeRouter.get(`${Append}/:id`, isAuthenticated, authorizeRoles("admin", "lead", "manager"), getTypeOfProject);
typeRouter.get(`${Append}/get/all`, isAuthenticated, authorizeRoles("admin", "lead", "manager"), getAllTypeOfProject);

// Post Requests
typeRouter.post(`${Append}/create`, isAuthenticated, authorizeRoles("admin", "lead", "manager"), createType);

// Put Requests
typeRouter.put(`${Append}/edit/:id`, isAuthenticated, authorizeRoles("admin", "lead", "manager"), updateType);

// Delete Request
typeRouter.delete(`${Append + deleteAppend}/:id`, isAuthenticated, authorizeRoles("admin", "lead", "manager"), deleteType); 

export default typeRouter;