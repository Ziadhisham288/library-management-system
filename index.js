import express from "express"
import { connection } from "./db/connection.js"
import userRouter from "./src/modules/User/user.routes.js"
import bookRouter from "./src/modules/Book/book.routes.js"
import borrowRouter from "./src/modules/Borrow/borrow.routes.js"

const app = express()
const PORT = 3000

app.use(express.json())
connection()

app.use("/api/auth", userRouter)
app.use("/api/books", bookRouter)
app.use("/api/borrows", borrowRouter)

app.listen(PORT , () => {
  console.log(`App is running on port ${PORT}`)
})