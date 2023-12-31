import userModel from "../models/userModel.js"
import { hashPassword } from "../helpers/authHelper.js";

export const registerController = async (req, res) =>{

  try {

    const {name, email, password, phone , address} = req.body

    // validate

    if(!name){
        return res.send ({error : "Name is Required"});
    }

    if(!email){
        return res.send ({error : "Email is Required"});
    }

    if(!password){
        return res.send ({error : "Password is Required"});
    }

    if(!phone){
        return res.send ({error : "Phone no. is Required"});
    }


    if(!address){
        return res.send ({error : "Address is Required"});
    }

    // checking user 

    const existingUser = await userModel.findOne({email});

    // checking existing user

    if(existingUser){
        return res.status(200).send({
            success:true,
            message : "User Already Exist, Login please"
        })
    }

    // register user 

    const hashedPassword = await hashPassword(password)

    // save
    const user = await new userModel({name, email, phone, address, password:hashedPassword}).save();
    
    res.status(201).send({
        success : true,
        message : " User Registered Successfully",
        user
    })



  } catch (error) {
    console.log(error);
    res.status(500).send({
        success :false,
        message : "Error in Registration",
        error
    })
    
  }


};