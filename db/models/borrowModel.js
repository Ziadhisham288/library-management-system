import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import User from "./userModel.js";
import Book from "./booksModel.js";

const Borrow = sequelize.define("Borrow", {
  borrowDate : {
    type : DataTypes.DATE,
    defaultValue : DataTypes.NOW
  },
  returnDate : {
    type : DataTypes.DATE
  }
})


export default Borrow;