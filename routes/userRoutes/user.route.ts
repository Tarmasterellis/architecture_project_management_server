// Express
import express from "express";
// Role Based Authentication
import { authorizeRoles, isAuthenticated } from "../../middleware/auth";
// Custom Controllers
import { changePassword, deleteUser, getAllUsers, getUserInfo, updateUser, updateUserRole, userActivation, userLogin, userLogout, userRegistration } from "../../controllers/userController/user.controller";

const userRouter = express.Router();

const userAppend = '/user';
const deleteAppend = '/delete';

// Get Requests
userRouter.get(`${userAppend}/me`, isAuthenticated, getUserInfo);
userRouter.get(`${userAppend}/logout`, isAuthenticated, userLogout);
userRouter.get(`${userAppend}/all`, isAuthenticated, authorizeRoles("admin"), getAllUsers);

// Post Requests
userRouter.post(`${userAppend}/login`, userLogin);
// userRouter.post(`${userAppend}/social`, socialAuth);
userRouter.post(`${userAppend}/activate`, userActivation);
userRouter.post(`${userAppend}/registration`, userRegistration);

// Put Requests
userRouter.put(`${userAppend}/edit`, isAuthenticated, updateUser);
userRouter.put(`${userAppend}/change-password`, isAuthenticated, changePassword);
userRouter.put(`${userAppend}/role`, isAuthenticated, authorizeRoles("admin"), updateUserRole);

// Delete Request
userRouter.delete(`${userAppend + deleteAppend}/:id`, isAuthenticated, authorizeRoles("admin"), deleteUser); 

export default userRouter;