import React, { useState } from 'react'
import assets from '../chat-app-assets/assets'
import { useContext } from 'react'
import { Authcontext } from '../../context/Authcontext'

const Login = () => {
  const [currentstate,setCurrentstate]=useState('Signup')
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [bio,setBio]=useState('')
  const [isdatasubmitted,setIsdatasubmitted]=useState(false)

  const {login}=useContext(Authcontext)

  const onsubmithandler=async(e)=>{
    e.preventDefault();
    if(currentstate==='Signup' && !isdatasubmitted){
      setIsdatasubmitted(true)
      return 
    }
    login(currentstate=="Signup"?'signup':'login',{name,email,password,bio})
  }

  return (
    <div className='min-h-screen bg-linear-to-br from-[#1e1e2f] via-[#2a2a40] to-[#12121c] flex items-center justify-center gap-10 max-sm:flex-col px-4'>

      {/* left */}
      <img 
        className='w-[min(30vw,260px)] drop-shadow-2xl hover:scale-105 transition duration-300' 
        src={assets.logo_big} 
        alt="" 
      />

      {/* right */}
      <form onSubmit={onsubmithandler} className='ml-30 w-90 backdrop-blur-xl bg-white/10 border border-white/20 text-white p-8 rounded-2xl shadow-2xl flex flex-col'>

        <h2 className='font-semibold text-2xl flex justify-between items-center mb-4'>
          {currentstate}
          {isdatasubmitted && (

          <img onClick={()=>setIsdatasubmitted(false)} 
            className='w-5 cursor-pointer hover:rotate-180 transition duration-300' 
            src={assets.arrow_icon} 
            alt="" 
          />
          )}
        </h2>

        {currentstate=='Signup' && !isdatasubmitted &&(
          <input 
            onChange={(e)=>setName(e.target.value)} 
            value={name} 
            type="text" 
            className='mt-2 p-3 bg-white/10 border border-gray-400/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-300 transition' 
            placeholder='Full Name' 
            required 
          />
        )}

        {!isdatasubmitted && (
          <>
            <input 
              onChange={(e)=>setEmail(e.target.value)} 
              value={email} 
              className='mt-3 p-3 bg-white/10 border border-gray-400/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-300 transition' 
              type="email" 
              placeholder='Email address' 
              required 
            />

            <input 
              onChange={(e)=>setPassword(e.target.value)} 
              value={password} 
              className='mt-3 p-3 bg-white/10 border border-gray-400/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-300 transition' 
              type="email" 
              placeholder='Password' 
              required 
            />
          </>
        )}

        {
          currentstate==='Signup' && isdatasubmitted && (
            <textarea 
              onChange={(e)=>(setBio(e.target.value))} 
              value={bio} 
              rows={4} 
              className='mt-3 p-3 bg-white/10 border border-gray-400/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-300 transition resize-none' 
              placeholder='Provide a short bio' 
              required
            ></textarea>
          )
        }

        <button 
          type='submit' 
          className='mt-5 py-3 bg-linear-to-r from-purple-500 to-violet-600 hover:from-violet-600 hover:to-purple-500 transition duration-300 text-white rounded-lg font-medium shadow-lg hover:shadow-purple-500/30'
        >
          {currentstate==='Signup' ? "Create Account" : 'Login now'}
        </button>

        <div className='flex items-start gap-2 text-sm text-gray-300 mt-4'>
          <input type="checkbox" className='accent-purple-500 mt-1 cursor-pointer' />
          <p>
            Agree to the <span className='underline cursor-pointer hover:text-white'>terms of use</span> & 
            <span className='underline cursor-pointer hover:text-white'> privacy policy</span>.
          </p>
        </div>
        <div className='flex flex-col gap-2'>
          {currentstate==='Signup'?(
            <p className='mt-4 text-sm text-gray-50'>Already have an account? <span onClick={()=>{setCurrentstate('Login');setIsdatasubmitted(false)}} className='font-medium text-violet-500 cursor-pointer'>Login Here</span></p>
          ):(
            <p className='mt-4 text-sm text-gray-50'>Create an account <span onClick={()=>{setCurrentstate('Signup');}} className='font-medium text-violet-500 cursor-pointer'>Click Here</span></p>
          )}
        </div>
      </form>
    </div>
  )
}

export default Login