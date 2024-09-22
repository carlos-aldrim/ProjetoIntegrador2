import { Router } from "express";

import { CreateUserController } from "../../Controller/User/CreateUserController";
import { CurrentUserController } from "../../Controller/User/CurrentUserController";
import { DeleteUserController } from "../../Controller/User/DeleteUserController";
import { LoginUserController } from "../../Controller/User/LoginUserController";
import { UpdateUserController } from "../../Controller/User/UpdateUserController";
import { ConfirmTokenUserController } from "../../Controller/User/ConfirmTokenUserController";

import { ensureAutheticated } from "../../Middlewares/Auth";

export const userRoutes = Router();

const createUserController = new CreateUserController();
const loginUserController = new LoginUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const currentUserController = new CurrentUserController();
const confirmTokenUserController = new ConfirmTokenUserController();

userRoutes.post("/new-user", createUserController.execute);
userRoutes.post("/login", loginUserController.execute);
userRoutes.post("/confirm-token", confirmTokenUserController.execute);
userRoutes.post("/update-user", ensureAutheticated, updateUserController.execute);
userRoutes.get("/delete-user", ensureAutheticated, deleteUserController.execute);
userRoutes.get("/my", ensureAutheticated, currentUserController.execute);