
export const authorizeAdmin = (req, res, next) => {
  const {role} = req.auth

  if (role != "admin") {
    return res.json({message : "Not authorized to modify books"})
  } 

  next()
}