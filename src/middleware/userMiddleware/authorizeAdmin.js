
export const authorizeAdmin = (req, res, next) => {
  const {role} = req.auth.user

  if (role != "admin") {
    return res.json({message : "Not authorized to modify books"})
  } 

  next()
}