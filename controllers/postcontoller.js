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
    res.status(500).json({
        success: false,
        error: err.message
    })
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
        res.status(500).json({
            success: false,
            error: error.message
        })
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
        res.status(500).json({
            success: false,
            error: error.message
        })
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
        console.log(tags);
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
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

exports.likePost = async (req,res,next)=>{
    try {
        const user = req.user;
        const userID = req.user._id;
        const {id} = req.params;
        if(!ObjectID.isValid(id)){
            return res.status(401).json({
                success: false,
                message: "Object ID invalid"
            })
        }
        const post = await Post.findById(id);
        if(!post){
            return res.status(401).json({
                success: false,
                message: "Post not found"
            })
        }
        console.log(post.user);
        if ((post.liked.filter(user => user.toString() === userID.toString()).length) <= 0 && post.user.toString()!=userID.toString()) //What filter does is, it returns an array that meets the conditions that were specific inside the filter method. Here, the condition was whether the userID already existed. If it existed, it would return an array with that ID alone, which would make the length more than 0. Hence, it means the user already liked. Also, we are checking whether it is the user who created the post, liking the post.
        {
            post.liked.push(userID);
            post.likes = post.likes + 1;
            await post.save();
            return res.status(201).json({
                success: true,
                post
            });
        }
        else{
            res.status(400).json({
                success: false,
                message: "You have already liked once or are the creator of this post"
            })
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}