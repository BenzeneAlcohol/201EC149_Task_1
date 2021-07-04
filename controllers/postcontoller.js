const User = require('../models/User');
const Post = require('../models/Post');
const ObjectID = require('mongodb').ObjectID;


exports.createPost = async (req,res,next)=>{
    try{
        const {title, description, tags} = req.body;
    const user = req.user;
    const post = await Post.create({
        title,
        description,
        user,
        tags
    })
    user.posts.push(post._id);
    await user.save();
    return res.status(201).json(post);
}catch(error){
    console.log(error);
}
}

exports.displayOnePost = async (req,res,next)=>{
    try {
        const {id} = req.params;
        if(!ObjectID.isValid(id)){
            return res.status(401).json({
                success: false,
                message: "Object ID invalid"
            })
        }
        const post = await Post.findById(id).populate('user', ['email']);
        if(!post){
            return res.status(401).json({
                success: false,
                message: "No Post exists"
            })
        }
        res.status(200).json(post);
    } catch (error) {
        console.log(error);
    }
} //Displaying one specific post

exports.updatePostbyID = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const postUser = req.user;
        console.log("User", postUser);
        const post = await Post.findById(id);
        console.log("Post", post);
        let created = false;
        postUser.posts.map((post)=>{
            if(post==post._id)
            {
                created=true;
            }
        }) //Checking whether the user created this post.
        if(!created)
        {
            return res.status(400).json({
                success: false,
                message: "You did not create the post, hence you are not allowed to update"
            })
        }
        const newPost = await Post.findByIdAndUpdate(id, req.body);
        res.status(201).json({
            success: true,
            message: "Post has been updated successfully"
        });
    } catch (error) {
        console.log(error);
    }
}//Only the post creator can update the post.

exports.displayAllPosts = async (req,res,next)=>{
    try {
        const posts = await Post.find({}).populate('user');
        return res.status(200).json(posts);
      } catch (err) {
          res.status(500).json({
              success: false,
              error: err.message
          })
      }
}

exports.displayPostsbyTag = async(req,res,next)=>{
    try {
        const tags = req.query.tag;
        const posts = await Post.find({tags: {$all: tags}})
        console.log(posts.length);
        if(posts.length==0){
            return res.status(206).json({
                message: "No posts with such tags/combination of tags"
            })
        }
        res.status(201).json(posts);
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
} //For displaying whether there are posts with a specific tag

exports.displayPostsbyTitle = async(req,res,next)=>{
    try {
        const title = req.query.title;
        const posts = await Post.findOne({title: title});
        console.log(posts);
        if(!posts){
            return res.status(206).json({
                message: "No post with that title found"
            })
        }
        res.status(201).json(posts);
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}//Use %20 for space in the title. There should be exact match for the title also.


exports.deletePost = async (req,res,next)=>{
    try {
        const {id} = req.params;
        const postUser = req.user;
        const post = await Post.findById(id);
        console.log(typeof(post.user));
        console.log(typeof(postUser._id));
        if(post.user.toString()===postUser._id.toString())
        {
            console.log("Reached here");
            const newPost = await Post.findOneAndDelete({_id: id});
            console.log(newPost);
            const index = postUser.posts.indexOf(id); //Removing the id of the post from the user who created the post
            postUser.posts.splice(index, 1);
            await postUser.save();
            res.status(201).json({
                success: true
            })
        }
    } catch (error) {
        console.log(error);
    }
}