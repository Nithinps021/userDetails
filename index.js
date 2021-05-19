const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config()
const {
  signUp,
  getAllUserDetails,
  editUserDetails,
  deleteUser,
  login,
  verifyToken
} = require("./userFunctions");

const app = express();
app.listen(8080);

// database authentication
const uri =process.env.MONGODB;
mongoose.connect(uri,{useUnifiedTopology:true,useNewUrlParser:true})
.then(()=>{
  console.log("db connected")
})
.catch((error)=>{
  console.log(error)
})

app.use(express.json())

// router to get all userDetails
app.get("/", (req, res) => {
  return res.status(200).json("express server running");
});
app.get("/allusers",verifyToken, getAllUserDetails);
app.post("/signup", signUp);
app.put("/:userId",verifyToken, editUserDetails);
app.delete("/:userId",verifyToken,deleteUser)
app.post('/login',login)