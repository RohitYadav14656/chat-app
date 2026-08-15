import "dotenv/config"
import express from 'express'
import cors from 'cors'
import mongoose from "mongoose"
import http from "http"
import userroute from "./routes/userroutes.js"
import messageroute from "./routes/messageroute.js"
import {Server} from 'socket.io'

const PORT = process.env.PORT || 5000
const mongourl=process.env.MONGO_URL

const app=express();
const server = http.createServer(app);                                              //step 1
// initialize Socket.io server 
export const io=new Server(server,{                                                 // step2
  cors:{origin:"*"} // by using * it will allow all the origins
})
//store online users
export const usersocketmap={} //userid:socketid                                     step-3

//socket.io connection handler
io.on("connection", (socket) => {
  const userid = socket.handshake.query.userid
  console.log("user connected", userid)

  if (userid) usersocketmap[userid] = socket.id

  io.emit("getonlineusers", Object.keys(usersocketmap))

  socket.on("disconnect", () => {       // ✅ correct event name is "disconnect"
    delete usersocketmap[userid]
    io.emit("getonlineusers", Object.keys(usersocketmap))
  })                                    // ✅ was missing callback wrapper entirely
})

app.use(express.json({limit:"4mb"}))
app.use(cors())

app.get('/',(req,res)=>{
  res.send("working")
})

app.use('/api/status',(req,res)=>{
  res.send("server is live")
})

app.use('/api/auth',userroute)
app.use('/api/messages',messageroute)

try {
  await mongoose.connect(mongourl, {
  dbName: 'Chat'
})
  console.log('connected successfully')
} catch (error) {
  console.log(error)  
}

server.listen(PORT,()=>{
  console.log("server running on port 5000")
})