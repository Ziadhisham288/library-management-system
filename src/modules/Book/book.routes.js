import { Router } from "express";
import { addBook, deleteBook, getBooks, searchBooks, updateBook } from "./book.controller.js";
import { authenticateUser } from "../../middleware/userMiddleware/authenticateUser.js";
import { authorizeAdmin } from "../../middleware/userMiddleware/authorizeAdmin.js";


const bookRouter = Router()

bookRouter.post("/", authenticateUser, authorizeAdmin, addBook)
bookRouter.put("/:id", authenticateUser, authorizeAdmin, updateBook)
bookRouter.delete("/:id", authenticateUser, authorizeAdmin, deleteBook)
bookRouter.get("/", authenticateUser, getBooks)
bookRouter.get("/search", authenticateUser, searchBooks)


export default bookRouter;