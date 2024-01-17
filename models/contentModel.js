import mongoose from "mongoose";
const {ObjectId}=mongoose.Schema;

const contentSchema=mongoose.Schema(
   
   {
    userId:String,
    title:String,
    body:String
   }
)
const contentModel=mongoose.model("contents",contentSchema)
export default contentModel