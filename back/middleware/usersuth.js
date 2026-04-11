import User from "../models/usermodel.js";
import jwt from 'jsonwebtoken'

const jwtsecretkey = process.env.JWT_SECRET

export const protectroute = async (req, res, next) => {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, jwtsecretkey)
    const user = await User.findById(decoded.userid).select('-password')
    if (!user) {
      return res.json({ success: false, message: 'user not found' })
    }
    req.user = user
    next()
  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: "User not found" })
  }
}