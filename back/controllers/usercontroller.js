import User from '../models/usermodel.js'
import { generatetoken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js'
import bcrypt from 'bcryptjs'

const signup=async(req,res)=>{
  const {name,email,password,bio}=req.body;
  try {
    if(!name || !email || !password || !bio){
      return res.json({success:false,message:"Missing details"})
    }
    const user=await User.findOne({email})
    if(user){
       return res.json({success:false,message:"User Exists"})
    }
   const hashedpassword = await bcrypt.hash(password, 10) // ✅

    const newuser=await User.create({
      name,email,password:hashedpassword,bio
    })

    const token=generatetoken(newuser._id)
    res.json({success:true,newuser,token,message:"Account with token created successfully"})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Account not created"})
  }
}


const login=async (req,res)=>{
  try {
    const {email,password}=req.body
    const userdata=await User.findOne({email})

    const ispasswordcorrect=await bcrypt.compare(password,userdata.password)

    if(!ispasswordcorrect){
      return res.json({success:false,message:"Inavlid Password"})
    }
    const token=generatetoken(userdata._id)
    
    res.json({success:true,userdata,token,message:"User logged in successfully"})
  } catch (error) {
    res.json({success:false,message:"Account not loggedin"})
    
  }
}

// controller to check user is authenticated or not
const checkauth=async(req,res)=>{
  res.json({success:true,user:req.user})
}

// controller to update user profile details
const updateprofile=async(req,res)=>{
  try {
    const {profilepic,bio,name}=req.body;
    const userid=req.user._id
    let updateuser;
    if(!profilepic){
      updateuser=await User.findByIdAndUpdate(userid,{bio,name},{new:true})
    }else{
      const upload = await cloudinary.uploader.upload(profilepic)

      updateuser=await User.findByIdAndUpdate(userid,{profilepic:upload.secure_url,bio,name},{new:true})
    }
    res.json({success:true,user:updateuser})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
  }
}
export {login,signup,updateprofile,checkauth}