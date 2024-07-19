import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.json({ message: "Register first!" });
  }

  const decoded = jwt.verify(token, "secretKey");
  req.auth = decoded;
  next();
};
