import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import Borrow from "./borrowModel.js";


const Book = sequelize.define('Book', {
  title : {
    type : DataTypes.STRING,
    allowNull : false
  },
  author: {
    type : DataTypes.STRING,
    allowNull : false
  },
  genre: {
    type : DataTypes.STRING,
    allowNull : false
  },
  isBorrowed : {
    type : DataTypes.BOOLEAN,
    defaultValue : false
  }
})


export default Book;
