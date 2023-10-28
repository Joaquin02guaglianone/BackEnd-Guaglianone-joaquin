import { Router } from 'express';
import { AllUsers, userById, deleteUserByID, UpdateUserById} from '../controllers/controllerUsers.js';

export const userRouter = Router();

 userRouter.get("/", AllUsers)

 userRouter.get("/", userById)

 userRouter.delete("/:uid", deleteUserByID)

 userRouter.put("/:uid", UpdateUserById)

