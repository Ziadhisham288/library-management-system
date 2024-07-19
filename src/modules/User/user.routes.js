import { Router } from "express";
import { hashPassword } from "../../middleware/userMiddleware/hashPassword.js";
import { login, register } from "./user.controller.js";

const userRouter = Router()

userRouter.post("/register", hashPassword, register)
userRouter.post("/login", login)



export default userRouter;