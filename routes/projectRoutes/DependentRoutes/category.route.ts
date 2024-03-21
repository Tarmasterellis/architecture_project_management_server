// Express
import express from "express";
import { authorizeRoles, isAuthenticated } from "../../../middleware/auth";
// Custom Controllers
import { getAllCategoryOfProject, getCategoryOfProject, createCategory, updateCategory, deleteCategory } from "../../../controllers/projectController/DependentControllers/category.controller";

const categoryRouter = express.Router();

const Append = '/category';
const deleteAppend = '/delete';

// Get Requests
categoryRouter.get(`${Append}/:id`, isAuthenticated, authorizeRoles("admin", "lead", "manager"), getCategoryOfProject);
categoryRouter.get(`${Append}/get/all`, isAuthenticated, authorizeRoles("admin", "lead", "manager"), getAllCategoryOfProject);

// Post Requests
categoryRouter.post(`${Append}/create`, isAuthenticated, authorizeRoles("admin", "lead", "manager"), createCategory);

// Put Requests
categoryRouter.put(`${Append}/edit/:id`, isAuthenticated, authorizeRoles("admin", "lead", "manager"), updateCategory);

// Delete Request
categoryRouter.delete(`${Append + deleteAppend}/:id`, isAuthenticated, authorizeRoles("admin", "lead", "manager"), deleteCategory); 

export default categoryRouter;