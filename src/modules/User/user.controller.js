import User from "../../../db/models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const userExists = await User.findOne({
      where: {
        username,
      },
    });

    if (userExists) {
      return res.json({
        message:
          "User already exists, register with another name or login instead.",
      });
    }

    const user = await User.create({ username, password, role });

    res.json({ message: "User registered successfully", user: user });
  } catch (error) {
    console.log({ message: "error in register", error: error });
    req.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        username,
      },
    });
    console.log(user);

    if (!user) {
      return res.json({ message: "User doesn't exist, register instead?" });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) return res.json({ message: "Invalid password!" });

    const token = jwt.sign({ user }, "secretKey");

    res.json({ message: "User logged in successfully", token: token });
  } catch (error) {
    console.log({ message: "error in login", error: error });
    req.status(500).json({ message: "Internal server error" });
  }
};
