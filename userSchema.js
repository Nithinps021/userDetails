const {Schema,model} =require('mongoose')


const userModelSchema=new Schema({
    name:String,
    email:{
        type:String,
        unique:true,
    },
    address:String
})

var userModel=model('userdetails',userModelSchema)
module.exports={userModel}