const{userModel}=require('./userSchema')


const getAllUserDetails=async(req,res)=>{
    try{
        const userDetails = await userModel.find({})
        return res.status(200).send(userDetails)
    }
    catch(error){
        return res.status(500).send({message:"Not able to get the Details of all users",error})
    }
}

const insertIntoDatabase=async(body)=>{
    return new Promise((resolve,reject)=>{
        const {name,email,address} =body
        const newUser= new userModel({name,email,address})
        newUser.save()
        .then((newUserData)=>{
            resolve(newUserData)
        })
        .catch((error)=>{
            console.log(error)
            reject(error)
        })
    })    
}
const editUserDetails=async(req,res)=>{
    const {name,address}=req.body
    const {userId}=req.params
    try{
        const updatedDetails = await userModel.updateOne({_id:userId},{name,address})
        return res.status(200).json({updatedDetails})
    }
    catch(error){
        return res.status(500).json({message:"Unable to modify the details",error})
    }
}

const signUp=async (req,res)=>{
    try{
        const response= await insertIntoDatabase(req.body) 
        return res.status(200).json(response)
    }
    catch(error){
        return res.status(500).json({message:"The user not created",error})
    }
}
const deleteUser=async(req,res)=>{
    try{
        const {userId}=req.params
        await userModel.deleteOne({_id:userId})
        return res.status(200).json({message:"Deleted the user"})
    }
    catch(error){
        return res.status(500).json({message:"Not able to delete the user"})
    }
}

module.exports={signUp,editUserDetails,getAllUserDetails,deleteUser}