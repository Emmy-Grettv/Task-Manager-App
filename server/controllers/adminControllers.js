const asyncHandler = require('express-async-handler')
const User = require('../models/auth/userModel');

//Find and delete a user
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try{
        const user = await User.findByIdAndDelete(id);
        if(!user){
            res.status(404).json({ message: "User Not Found!" });
        };
        res.status(200).json({ message: "User deleted successfully"});
    }catch(error){
        res.status(500).json({ message: "Cannot delete user!" })
    }
}) ;

//Get all users
const   getAllUsers = asyncHandler(async (req, res) => {
    try{
        const users = await User.find({});
        if(!users){
            res,status(404).json({ message: "No users found!" })
        }
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({message: "Cannot get users!" })
    }
});