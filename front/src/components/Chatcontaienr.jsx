import React, { useEffect, useRef, useState } from 'react'
import assets from '../chat-app-assets/assets'
import { formatmessagetime } from '../lib/utils'
import { useContext } from 'react'
import { Chatcontext } from '../../context/chatcontext'
import { Authcontext } from '../../context/Authcontext'

const Chatcontaienr = () => {
  const { messages, selecteduser, setSelecteduser, sendmessage, getmessages } = useContext(Chatcontext)
  const { authuser, onlineusers } = useContext(Authcontext)

  const scrollend = useRef(null)
  const [input, setInput] = useState('')

  const handlesendmessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return null
    await sendmessage({ text: input.trim() })
    setInput("")
  }

  const handlesendimage = async (e) => {
    const file = e.target.files[0]
    if (!file || !file.type.startsWith("image/")) {
      console.log("Error : Select an image file")
      return
    }
    const reader = new FileReader()
    reader.onload = async () => {
      await sendmessage({ image: reader.result })
      e.target.value = ""
    }
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    if (selecteduser) {
      getmessages(selecteduser._id)
    }
  }, [selecteduser])

  useEffect(() => {
    scrollend.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return selecteduser ? (
    <div className='h-full w-full flex flex-col overflow-hidden text-white'>

      {/* Header */}
      <div className='shrink-0 flex items-center gap-3 py-3 px-4 border-b border-white/10 bg-zinc-900/80 backdrop-blur-md'>
        <div className='relative'>
          <img
            className='w-9 h-9 rounded-full object-cover ring-2 ring-violet-500/40'
            src={selecteduser.profilePic || assets.avatar_icon}  
            alt=""
          />
          {onlineusers.includes(selecteduser._id) && (
            <span className='absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-zinc-900'></span>
          )}
        </div>

        <div className='flex-1 min-w-0'>
          <p className='text-sm font-semibold text-white truncate'>{selecteduser.fullName}</p>
          <p className='text-xs text-emerald-400'>
            {onlineusers.includes(selecteduser._id) ? 'Online' : 'Offline'}
          </p>
        </div>

        <img
          onClick={() => setSelecteduser(null)}
          className='md:hidden w-5 cursor-pointer opacity-60 hover:opacity-100 transition-opacity'
          src={assets.arrow_icon}
          alt=""
        />
        <img
          className='hidden md:block w-5 cursor-pointer opacity-50 hover:opacity-100 transition-opacity'
          src={assets.help_icon}
          alt=""
        />
      </div>

      {/* Messages */}
      <div className='flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3'>
        {messages.map((msg, index) => {
          const isMe = msg.senderid === authuser._id  // ✅ fixed: senderid not senderId

          return (
            <div
              key={index}
              className={`flex items-end gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}  
            >
              <img
                className='w-7 h-7 rounded-full object-cover shrink-0'
                src={isMe
                  ? (authuser.profilePic || assets.avatar_icon)   // ✅ logged-in user's actual pic
                  : (selecteduser.profilePic || assets.avatar_icon) // ✅ selected user's actual pic
                }
                alt=""
              />

              <div className={`flex flex-col gap-1 max-w-[60%] ${isMe ? 'items-end' : 'items-start'}`}>
                {msg.image ? (
                  <img
                    className='max-w-55 rounded-2xl border border-white/10 shadow-lg'
                    src={msg.image}
                    alt=""
                  />
                ) : (
                  <p className={`px-4 py-2.5 text-sm rounded-2xl wrap-break-word leading-relaxed shadow-md
                    ${isMe
                      ? 'bg-violet-600/40 border border-violet-500/20 rounded-br-sm'
                      : 'bg-zinc-800 border border-white/5 rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </p>
                )}
                <p className='text-[10px] text-zinc-500 px-1'>{formatmessagetime(msg.createdAt)}</p>
              </div>
            </div>
          )
        })}
        <div ref={scrollend}></div>
      </div>

      {/* Input */}
      <div className='shrink-0 px-4 py-3 border-t border-white/10 bg-zinc-900/80 backdrop-blur-md'>
        <div className='flex items-center gap-3 bg-zinc-800/80 border border-white/10 px-4 rounded-2xl'>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => e.key === "Enter" ? handlesendmessage(e) : null}
            className='flex-1 bg-transparent text-sm py-3 outline-none text-white placeholder-zinc-500'
            type="text"
            placeholder='Type a message...'
          />
          <input onChange={handlesendimage} type="file" accept='image/png,image/jpeg' id="image" hidden />
          <label htmlFor="image" className='cursor-pointer opacity-50 hover:opacity-100 transition-opacity'>
            <img src={assets.gallery_icon} alt="" className='w-5' />
          </label>
          <button onClick={handlesendmessage} className='cursor-pointer opacity-70 hover:opacity-100 transition-opacity'>
            <img src={assets.send_button} className='w-5' alt="" />
          </button>
        </div>
      </div>

    </div>
  ) : (
    <div className='h-full flex flex-col items-center justify-center gap-3 bg-zinc-950/40 max-md:hidden'>
      <div className='w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center'>
        <img className='w-9' src={assets.logo_icon} alt="" />
      </div>
      <p className='text-base font-semibold text-white'>Chat anytime, anywhere</p>
      <p className='text-xs text-zinc-500'>Select a conversation to get started</p>
    </div>
  )
}

export default Chatcontaienr