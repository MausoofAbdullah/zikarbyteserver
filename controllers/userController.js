
import contentModel from "../models/contentModel.js";
import UserModel from "../models/userModel.js";
import bcrypt,{genSalt} from "bcrypt";

import dotenv from "dotenv"
import jwt from "jsonwebtoken";



dotenv.config()



export const registerUser = async (req, res) => {
    console.log(req.body)

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPass;
   
  
  
 
  
  
     const newUser = new UserModel(req.body);
     const { email } = req.body;
    
     
    
  
    try {
      const oldUser = await UserModel.findOne({ email });
      
  
      if (oldUser) {
        return res
          .status(400)
          .json({ message: "username is already registered" });
      }
  
      const user = await newUser.save();
      
   
  
   
      // const token = jwt.sign(
      //   {
      //     username: user.username,
      //     id: user._id,
      //   },
      //   process.env.JWT_KEY,
      //   { expiresIn: "1h" }
      // );
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  
  
  export const loginUser = async (req, res) => {
    
    const { email, password } = req.body;

    try {
      const user = await UserModel.findOne({ email: email });
      if (user) {
        const validity = await bcrypt.compare(password, user.password);
        
  
        // validity?res.status(200).json(user):res.status(400).json("wrong Password")
        if (!validity) {
          res.status(400).json({ message: "wrong password" });
        } else {
        //   console.log(user._id.toString(),"id")
          const userst=user._id.toString()
      const token = jwt.sign(
        {
          email: user.email,
          id: user._id,
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
    //   console.log(token,"to")
    const contentP=await contentModel.findOne({userId:userst})
    // if(contentP){

    // }
    console.log(contentP,"conee")
         
          res.status(200).json({user,token,contentP});
          
        }
      } else {
        res.status(400).json({ message: "user doesnot exist" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const addContent=async (req,res)=>{
    console.log(req.body,"ere")
    const {userId} =req.body
    // const userId=req.body.id
    console.log(userId,"useredi")
   
    // console.log(token,"te")
    const cont=await contentModel.findOne({userId:userId})
    console.log(cont,"conttttttt")
    if(!cont){

        const newContent= new contentModel(req.body)
        console.log(req.body,"ffffffffff")
        try {
            await newContent.save()
            res.status(200).json(newContent)
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(400).json({message:"content present already"})
    }


  }
  export const getContent= async(req,res)=>{
    // const id=req.params.id
    console.log(req.body,"rewer")
    const {userId} =req.body

    try {
        const content = await contentModel.findOne({userId:userId});
       res.status(200).json(content)
    } catch (error) {
        res.status(500).json(error)
    }
}


// Introduce Your Product Quickly & Effectively
// Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
//  Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
//   ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, 
//   sem. Nulla consequat massa quis enim