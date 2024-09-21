import { Router } from "express";

import { userRoutes } from "./User";

export const router = Router();  

router.use("/usuario", userRoutes);