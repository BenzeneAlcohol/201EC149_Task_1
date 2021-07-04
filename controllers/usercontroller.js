const User = require('../models/User');
const Post = require('../models/Post');
const ObjectID = require('mongodb').ObjectID;


exports.dashboard = async (req,res,next)=>{
    const user = req.user;
    const userPosts = await User.findById(user._id).populate('posts');
    res.status(200).json(userPosts.posts);
} //Controller for returning the posts created by the user who is currently logged in.

exports.getUser = async(req,res,next)=>{
    try{
        const {id} = req.params;
        if(!ObjectID.isValid(id)){
            return res.status(401).json({
                success: false,
                message: "Object ID invalid"
            })
        }
        const user = await User.findById(id);
        if(!user){
            return res.status(206).json({
                success: false,
                message: "User not found"
            })
        }
        res.status(201).json(user);
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}