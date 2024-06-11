import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import { generateToken } from "../utils/utils.js";

// @dese Hegister a new user
// @router /api/users
// @access public

export const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;

    try {
        
        //First we find if the user is already exists 
        const findUser = await User.findOne({email})

        if(findUser) throw new Error("User Already Exists!", 400);

        const user = await User.create({name, email, password});

        if(user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            })

        }else{
            throw new Error("Invalid User Data!", 400);
        }

    } catch (error) {
        throw new Error(error);
    }
})


export const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    // First we find if the user exists
    const user = await User.findOne({ email });

    if(user  && (await user.comparePassword(password, user.password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        })
    }else{
        throw new Error("Invalid Email or Password!", 400);
    }

});