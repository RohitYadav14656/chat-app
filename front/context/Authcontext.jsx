import { createContext } from "react";
import axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";
import {io } from 'socket.io-client'

const backendurl=import.meta.env.VITE_BACKEND_URL
axios.defaults.baseURL=backendurl
 

 export const Authcontext=createContext()

 export const Authprovider=({children})=>{
  const [token,setToken]=useState(localStorage.getItem("token"))
  const [authuser,setAuthuser]=useState(null)
  const [onlineusers,setOnlineusers]=useState([])
  const [socket,setSocket]=useState(null)

// check if the user is authenticated or not, if so set the user data and connect the socket
const checkauth=async()=>{
  try {
    const {data}=await axios.get("/api/auth/check")
    if(data.success){
      setAuthuser(data.user)
      connectsocket(data.user)
    }
  } catch (error) {
    console.log(error)
  }
}

// login function to handle user authentication and handle user
const login=async(state,credentails)=>{  // states are login and signup
    try {
      const {data}=await axios.post(`/api/auth/${state}`,credentails)
      if(data.success){
        setAuthuser(data.userdata)
        connectsocket(data.userdata)
        axios.defaults.headers.common["token"]=data.token 
        setToken(data.token)
        localStorage.setItem("token",data.token)
        console.log(data.message)
      }else{
        console.log(data.message)
      }
    } catch (error) {
      console.log(error.message)
    }
}

//logout function for user logout and socket disconnection
const logout=async()=>{
  localStorage.removeItem("token")
  setToken(null)
  setAuthuser(null)
  setOnlineusers([])
  axios.defaults.headers.common["token"]=null
  console.log("disconnected successfully")
  socket.disconnect()
 }

 //update profile function
 const updateprofile=async(body)=>{
  try {
    const {data}=await axios.put("/api/auth/update-profile",body)
    if(data.success){
      setAuthuser(data.user)
      console.log("profile updated successfully")
    }
  } catch (error) {
    console.log(error.message)
  }
 }

useEffect(()=>{
    if(token){
      axios.defaults.headers.common["token"]=token 
    }
    checkauth()
},[])

// connect socket function to handle socket connection and online users updates
const connectsocket=(userdata)=>{
    if(!userdata || socket?.connected){
      return 
    }
    const newsocket=io(backendurl,{
       query: { userid: userdata._id }
    })
    newsocket.connect()
    setSocket(newsocket)

    newsocket.on("getonlineusers",(userids)=>{
      setOnlineusers(userids)
    })
}

    const value={
      axios,authuser,onlineusers,socket,login,logout,updateprofile
    }
    return (
      <Authcontext.Provider value={value}>
        {children}
      </Authcontext.Provider>
    )
 }