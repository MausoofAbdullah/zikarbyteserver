import mongoose from "mongoose";

const UserSchema=mongoose.Schema(
    {
        email:{
            type:String,
            required:true
        },
     
        password:{
            type:String,
            required:true
        },
     
    },
    {timestamps:true}
)

const UserModel=mongoose.model("users",UserSchema)
export default UserModel