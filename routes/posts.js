const express = require('express');
const {createPost, displayOnePost, updatePostbyID, displayAllPosts, displayPostsbyTag, displayPostsbyTitle, deletePost, likePost} = require('../controllers/postcontoller');
const {auth} = require('../middleware/auth');
const router = express.Router();

router.get('/', displayAllPosts); //displaying all the posts


router.post('/create', auth, createPost); //Creating a post needs authentication


router.get('/:id', displayOnePost); //Displaying one specific post doesn't need authentication 


router.put('/:id', auth, updatePostbyID); //Only the post creator can update the post, hence authentication is required


router.get('/search/tag', displayPostsbyTag); //For displaying whether there are posts with a specific tag. No auth required.



router.get('/search/title', displayPostsbyTitle); //For displaying whether there are posts with a specific title. No auth required.

router.post('/like/:id', auth, likePost); //For liking a post, hence auth required.

router.delete('/:id', auth, deletePost); //Deleting a post needs authentication

module.exports = router;