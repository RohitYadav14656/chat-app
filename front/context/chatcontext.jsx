import { createContext, useContext, useEffect, useState } from "react";
import { Authcontext } from "./Authcontext";


export const Chatcontext=createContext()

export const Chatprovider=({children})=>{
  const [messages,setMessages]=useState([])
  const [users,setUsers]=useState([])
  const [selecteduser,setSelecteduser]=useState(null)
  const [unseenmess,setUnseenmess]=useState({})

  const {axios,socket}=useContext(Authcontext)
  // function to get all users for side bar
  const getusers=async()=>{
    try {
      const {data}=await axios.get("/api/messages/users")
      console.log('Full response',data)
      if(data.success){
        console.log("user receiced",data)
        setUsers(data.users)
        setUnseenmess(data.unseenmessages)
      }else{
        console.log("Api success false")
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  //get messages for selected users
  const getmessages=async(userid)=>{
    try {
      const {data}=await axios.get(`/api/messages/${userid}`)
      if(data.success){
        setMessages(data.messages)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  //function to send message to selected users
  const sendmessage=async(messagedata)=>{
    try {
      const {data}=await axios.post(`/api/messages/send/${selecteduser._id}`,messagedata)
      if(data.success){
        setMessages((prevmessage)=>[...prevmessage,data.newmessage])
      }else{
        console.log(error.message)
      }
    } catch (error) {
      
    }
  }

  // function to subscribe to meesage for selected users or to get messages in real time
  const subscribetomessages=async()=>{
    if(!socket) return;
    
    socket.on("newmessage",(newmessage)=>{
      if(selecteduser && newmessage.senderid===selecteduser._id){
        newmessage.seen(true)
        setMessages((prevmessage)=>[...prevmessage,newmessage])
        axios.post(`/api/messages/mark/${newmessage._id}`)
      }else{
        setUnseenmess((prevunseenmess)=>({
          ...prevunseenmess,[newmessage.senderid]:prevunseenmess[newmessage.senderid]?prevunseenmess[newmessage.senderid]+1:1
        }))
      }
    })
  }

  //function to unsubscribe from messages
  const unsubscribemess=()=>{
    if(socket) socket.off("newmessage")

  }
  useEffect(()=>{
    subscribetomessages()
    return()=>unsubscribemess()
  },[socket,selecteduser])

  const value={
    messages,users,selecteduser,getusers,setMessages,sendmessage,setSelecteduser,unseenmess,setUnseenmess,getmessages
  }
  return (<Chatcontext.Provider value={value}>
{children}
  </Chatcontext.Provider>)
}