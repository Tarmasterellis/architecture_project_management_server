// Express
import express from "express";
import { authorizeRoles, isAuthenticated } from "../../../middleware/auth";
// Custom Controllers
import { getAllDrawingStageOfProject, getDrawingStageOfProject, createDrawingStage, updateDrawingStage, deleteDrawingStage } from "../../../controllers/projectController/DependentControllers/drawingStage.controller";

const drawingStageRouter = express.Router();

const Append = '/drawingStage';
const deleteAppend = '/delete';

// Get Requests
drawingStageRouter.get(`${Append}/:id`, isAuthenticated, authorizeRoles("admin", "lead", "manager"), getDrawingStageOfProject);
drawingStageRouter.get(`${Append}/get/all`, isAuthenticated, authorizeRoles("admin", "lead", "manager"), getAllDrawingStageOfProject);

// Post Requests
drawingStageRouter.post(`${Append}/create`, isAuthenticated, authorizeRoles("admin", "lead", "manager"), createDrawingStage);

// Put Requests
drawingStageRouter.put(`${Append}/edit/:id`, isAuthenticated, authorizeRoles("admin", "lead", "manager"), updateDrawingStage);

// Delete Request
drawingStageRouter.delete(`${Append + deleteAppend}/:id`, isAuthenticated, authorizeRoles("admin", "lead", "manager"), deleteDrawingStage); 

export default drawingStageRouter;