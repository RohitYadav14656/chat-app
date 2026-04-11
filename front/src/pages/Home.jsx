import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Chatcontaienr from '../components/Chatcontaienr'
import Rightsidebar from '../components/Rightsidebar'
import { useContext } from 'react'
import { Chatcontext } from '../../context/chatcontext'

const Home = () => {
  // const [selecteduser,setSelecteduser]=useState(false)

  const {selecteduser}=useContext(Chatcontext)

  return (
    <div className='w-full h-screen bg-zinc-950 p-3'>
      <div className={`py-5 px-5 h-full rounded-2xl grid grid-cols-1 relative border border-white/10 bg-zinc-900 shadow-xl shadow-black/50 transition-all duration-300 ${selecteduser ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' : 'md:grid-cols-2'}`}>
        <Sidebar/>
        <Chatcontaienr />
        {selecteduser && <Rightsidebar selecteduser={selecteduser} setSelecteduser={setSelecteduser}/>}
      </div>
    </div>
  )
}

export default Home