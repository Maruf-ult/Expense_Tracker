const mongoose=require('mongoose')
const userInfo = new mongoose.Schema({
    name:String,
    email: String,
    password:String
})


const userInformation = mongoose.model("userInfo",userInfo)
module.exports = userInformation