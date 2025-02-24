// Auth Controllers
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
// signup
export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {

        if(!email || !fullName || !password)
            return res.status(400).json({message: "All fields are required"})

        if(password.length < 6){
            return res.status(400).json({message : "Password must be atleast 6 chars"})
            // 400:Bad Request server would not process the request 
            // due to something the server considered to be a client error.
        }

        const user = await User.findOne({ email });
        if( user )
            return res.status(400).json({message : "Email already exists"})

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        if(newUser){
            // generate jwt token
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })

        } else {
            res.status(400).json({message : "Invalid User Data"})
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({message: "Internal Server Error" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        
        if(!user)
            return res.status(400).json({message: "Invalid Credentials | User not found"});

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect)
            return res.status(400).json({message: "Invalid Credentials"});

        generateToken(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        })

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({message: "Internal server error"});
        
    } 
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0});
        res.status(200).json({message: "Logged out Successfully"});

    } catch (error) {
        console.log("error in logout controller", error.message);
        res.status(500).json({message: "Internal Server Error"});        
    }
}

export const updateProfile = async (req, res) => {
    try {

        const { profilePic } = req.body;
        const userId = req.user._id;

        if(!profilePic)
            return res.status(400).json({message: "Profile Pic is required"});

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId, 
            {profilePic: uploadResponse.secure_url},
            {new: true}
        );

        res.status(200).json(updatedUser);

    } catch (error) {
        console.log("Error in update profile pic");
        res.status(500).json({message: "Internal Server Error"});       
    }
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({message: "Internal Server Error"});        
    }
}