import express from 'express'
import { markmessageasseen,getUsersforsidebar,getmessages,sendmessage } from '../controllers/messagecontroller.js'
import {protectroute} from '../middleware/usersuth.js'
 
const messageroute=express.Router();

messageroute.get('/users', protectroute, getUsersforsidebar)
messageroute.get('/:id',protectroute,getmessages)
messageroute.put('/mark/:id',protectroute,markmessageasseen)
messageroute.post('/send/:id',protectroute,sendmessage)

export default messageroute