const express = require("express");
const mongoose = require("mongoose");
const {
  signUp,
  getAllUserDetails,
  editUserDetails,
  deleteUser
} = require("./userFunctions");

const app = express();
app.listen(8080);

// database authentication
const uri =
  "mongodb+srv://user:user@123@cluster0.zusdk.mongodb.net/user?retryWrites=true&w=majority";
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
app.get("/allusers", getAllUserDetails);
app.post("/", signUp);
app.put("/:userId", editUserDetails);
app.delete("/:userId",deleteUser)