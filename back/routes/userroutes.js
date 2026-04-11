import express from 'express'
import { login,signup,checkauth,updateprofile } from '../controllers/usercontroller.js'
import { protectroute } from '../middleware/usersuth.js';

const userroute=express.Router();

userroute.post('/login',login)
userroute.post('/signup',signup)
userroute.put('/update-profile',protectroute,updateprofile)
userroute.get('/check',protectroute,checkauth)

export default userroute