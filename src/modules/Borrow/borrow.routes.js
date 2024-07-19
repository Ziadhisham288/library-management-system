import { Router } from "express";
import { authenticateUser } from "../../middleware/userMiddleware/authenticateUser.js";
import { borrowBook, getBorrows, returnBook } from "./borrow.controller.js";

const borrowRouter = Router()


borrowRouter.post("/borrow/:BookId" , authenticateUser, borrowBook )
borrowRouter.post("/return/:BookId" , authenticateUser, returnBook )
borrowRouter.get("/" , authenticateUser, getBorrows )





export default borrowRouter;