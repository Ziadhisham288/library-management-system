import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import Borrow from "./borrowModel.js";
import Book from "./booksModel.js";

const User = sequelize.define('User', {
  username : {
    type : DataTypes.STRING,
    allowNull : false
  },
  password : {
    type : DataTypes.STRING,
    allowNull : false
  },
  role : {
    type : DataTypes.STRING,
    defaultValue : "user"
  }
}) 

User.hasMany(Borrow);
Borrow.belongsTo(User)
Book.hasMany(Borrow)
Borrow.belongsTo(Book)

export default User;