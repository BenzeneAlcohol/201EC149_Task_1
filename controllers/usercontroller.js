const User = require('../models/User');
const Post = require('../models/Post');

exports.dashboard = async (req,res,next)=>{
    const user = req.user;
    const userPosts = await User.findById(user._id).populate('posts');
    res.status(200).json(userPosts.posts);
} //Controller for returning the posts created by the user who is currently logged in.