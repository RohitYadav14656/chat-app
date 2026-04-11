import React, { useContext, useEffect, useState } from 'react'
import assets from '../chat-app-assets/assets'
import {useNavigate} from 'react-router-dom'
import { Authcontext } from '../../context/Authcontext'
import { Chatcontext } from '../../context/chatcontext'

const Sidebar = () => {
// const Sidebar = ({selecteduser,setSelecteduser}) => {
  const {logout,onlineusers}= useContext(Authcontext)
  const {getusers,users,selecteduser,setSelecteduser,unseenmess,setUnseenmess}=useContext(Chatcontext)

  const [input,setInput]=useState("")
  
  const navigate=useNavigate()

  const filteredusers = input
  ? users?.filter((user) =>
      user.name.toLowerCase().includes(input.toLowerCase())
    )
  : users || [];

  useEffect(()=>{
     console.log("Fetching users...");
    getusers()
  },[onlineusers])

  return (
    // <div className={`pb-5 h-full p-5 rounded-r-xl ${selecteduser?'max-md-hidden':''} text-white `}>
     <div className={`pb-5 h-full p-5 rounded-r-xl ${selecteduser?'max-md-hidden':''} text-white `}> 
      <div className='flex justify-between items-center'>
        <img className='max-w-40' src={assets.logo} alt="logo" />
        <div className='relative py-2 group'>
        <img className='max-h-5 cursor-pointer' src={assets.menu_icon} alt="" />
        <div className='absolute top-full right-0 z-20 w-32 p-5 rounded-md border border-gray-600 text-gray-100 hidden group-hover:block'>
          <p onClick={()=>navigate('/profile')} className='cursor-pointer text-sm'>Edit Profile</p>
          <hr className='my-2 border-t border-gray-500'/>
          <p  onClick={()=>logout()} className='cursor-pointer text-sm'>Logout</p>
        </div>
        </div>
      </div>
      <div className='bg-gray-600 rounded-full flex items-center gap-2 py-3 px-4 mt-5'>
        <img  className='w-3 ' src={assets.search_icon} alt="search" />
        <input onChange={(e)=>setInput(e.target.value)} type="text" className='bg-transparent bg-none outline-none text-white text-xs flex-1' placeholder='Search user' />
      </div>
      <div className=' mt-5 flex flex-col'>
      {filteredusers.map((user,index)=>(
        <div onClick={()=>{setSelecteduser(user);setUnseenmess(prev=>({...prev,[user._id]:0}))}} key={index} className={`relative flex items-center gap-2  p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${selecteduser?._id===user._id && 'bg-[#282142]/50'}`}><img className='w-8.75 aspect-square rounded-full' src={user?.profilePic || assets.avatar_icon} alt="" />
        <div className='flex px-4 flex-col leading-5'>
          <p>{user.name}</p>
          {
            onlineusers.includes(user._id)?
            <span className='text-green-400 text-xs'>Online</span>:
            <span className='text-neutral-400 text-xs'>Offline</span>
          }
        </div>
        {unseenmess[user._id]>0 && <p className='absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-gray-500/35 '>{unseenmess[user._id]}</p>} 
        </div>
      ))}
      </div>
    </div>
  )
}

export default Sidebar
