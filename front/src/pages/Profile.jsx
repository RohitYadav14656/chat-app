import React, { useState } from 'react'
import assets from '../chat-app-assets/assets'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { Authcontext } from '../../context/Authcontext'

const Profile = () => {
  const {authuser,updateprofile}=useContext(Authcontext)
  const [selectedimg, setSelectedimg] = useState(null)
  const navigate = useNavigate()
  const [name, setName] = useState(authuser.name)
  const [bio, setBio] = useState(authuser.bio) 


  const handlesubmit=async(e)=>{
    e.preventDefault();
    if(!selectedimg){
      await updateprofile({name:name,bio})
      navigate('/')
      return 
    }
    const reader=new FileReader()
    reader.readAsDataURL(selectedimg)
    reader.onload=async()=>{
      const base64image=reader.result 
      await updateprofile({profilepic:base64image,name:name,bio})
      navigate('/')
    }
  }

  return (
    <div className='min-h-screen bg-zinc-950 flex items-center justify-center px-4'>
      <div className='w-full max-w-2xl border border-white/10 bg-zinc-900/80 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-black/60 flex items-center justify-between max-sm:flex-col gap-8 p-10'>

        {/* Form */}
        <form onSubmit={handlesubmit} className='flex flex-col gap-5 flex-1'>
          <div>
            <h3 className='text-xl font-semibold text-white'>Profile Details</h3>
            <p className='text-xs text-zinc-500 mt-1'>Update your Name, bio and photo</p>
          </div>

          {/* Name */}
          <div className='flex flex-col gap-1.5'>
            <label className='text-xs text-zinc-400 font-medium'>Display Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='bg-zinc-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500/60 transition-colors placeholder-zinc-600'
            />
          </div>

          {/* Bio */}
          <div className='flex flex-col gap-1.5'>
            <label className='text-xs text-zinc-400 font-medium'>Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className='bg-zinc-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500/60 transition-colors placeholder-zinc-600 resize-none'
            />
          </div>

          <button
            type='submit'
            className='mt-2 bg-violet-600 hover:bg-violet-500 transition-colors text-white text-sm font-medium py-2.5 rounded-xl'
          >
            Save Changes
          </button>
        </form>

        {/* Avatar Upload */}
        <div className='flex flex-col items-center gap-3'>
          <input
            onChange={(e) => setSelectedimg(e.target.files[0])}
            type="file"
            id='avatar'
            accept='.png, .jpg, .jpeg'
            hidden
          />
          <label htmlFor="avatar" className='cursor-pointer group relative'>
            <img
              src={selectedimg ? URL.createObjectURL(selectedimg) : assets.avatar_icon}
              alt="Profile"
              className='w-28 h-28 rounded-full object-cover ring-2 ring-violet-500/40 group-hover:ring-violet-500 transition-all'
            />
            <div className='absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
              <img src={authuser?.profilepic ||assets.logo_icon} alt="" className='w-6 opacity-80' />
            </div>
          </label>
          <p className='text-xs text-zinc-500'>Click to upload photo</p>
          {/* <img src={assets.logo_icon} alt="" /> */}
        </div>

      </div>
    </div>
  )
}

export default Profile