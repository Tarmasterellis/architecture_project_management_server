// Express
import express from "express";
// Custom Controllers
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { getAllDepartments, createDepartment, updateDepartment, deleteDepartment } from "../controllers/department.controller";

const departmentRouter = express.Router();

const departmentAppend = '/department';
const deleteAppend = '/delete';

// Get Requests
departmentRouter.get(`${departmentAppend}/all`, isAuthenticated, authorizeRoles("admin"), getAllDepartments);

// Post Requests
departmentRouter.post(`${departmentAppend}/create`, isAuthenticated, authorizeRoles("admin"), createDepartment);

// Put Requests
departmentRouter.put(`${departmentAppend}/edit`, isAuthenticated, authorizeRoles("admin"), updateDepartment);

// Delete Request
departmentRouter.delete(`${departmentAppend + deleteAppend}/:id`, isAuthenticated, authorizeRoles("admin"), deleteDepartment); 

export default departmentRouter;