import User from "../models/usermodel.js"
import Message from '../models/message.js'
import cloudinary from '../lib/cloudinary.js'
import { io, usersocketmap } from '../server.js'

const getUsersforsidebar = async (req, res) => {
  try {
    const userid = req.user._id;
    const filteredusers = await User.find({ _id: { $ne: userid } }).select("-password");
    const unseenmessages = {};
    const promises = filteredusers.map(async (user) => {
      const messages = await Message.find({
        senderid: user._id,
        receiverid: userid,
        seen: false
      });
      if (messages.length > 0) {
        unseenmessages[user._id] = messages.length;
      }
    });
    await Promise.all(promises);
    res.json({ success: true, users: filteredusers, unseenmessages });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getmessages = async (req, res) => {
  try {
    const { id: selecteduserid } = req.params;
    const myid = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderid: myid, receiverid: selecteduserid },
        { senderid: selecteduserid, receiverid: myid }
      ]
    })
    await Message.updateMany(
      { senderid: selecteduserid, receiverid: myid },
      { seen: true }
    )
    res.json({ success: true, messages })
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

const markmessageasseen = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndUpdate(id, { seen: true })
    res.json({ success: true })
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

const sendmessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const receiverid = req.params.id
    const senderid = req.user._id

    let imageurl;
    if (image) {
      const uploadresponse = await cloudinary.uploader.upload(image)
      imageurl = uploadresponse.secure_url
    }
    const newmessage = await Message.create({
      senderid, receiverid, text, image: imageurl
    })
    const receiversocketid = usersocketmap[receiverid]
    if (receiversocketid) {
      io.to(receiversocketid).emit("newmessage", newmessage)
    }
    res.json({ success: true, newmessage })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

export { getmessages, getUsersforsidebar, markmessageasseen, sendmessage }