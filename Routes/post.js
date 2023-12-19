const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const requireLogin = require('../middleware/requireLogin');
const Post =mongoose.model('Post');




router.get('/allposts', (req, res) => {
    Post.find()
    .populate('postedBy', "_id, name")
    .then(posts=>{
res.json({posts})
    })
    .catch(err => {
        console.log(err);
    });
})

router.post('/createpost', requireLogin,(req, res)=>{
const{title, body}=req.body;
if(!title||!body){

    return res.status(422).json({error:'please add all the fields'}); 

}

req.user.password=undefined
const post = new Post({
    title,
    body,
    postedBy:req.user
})
post.save().
then(result=>{
    res.json({post:result});
})
.catch(err=>{
    console.log(err);
})
})


router.get('/mypost', requireLogin,(req, res)=>{
    // we are quering the post by the id of the logged in user
Post.find({postedBy : req.user._id})
.populate("postedBy" , "_id name" )
.then(mypost=>{
    res.json({mypost:mypost});
})
.catch(err=>{
    console.log(err);
});
})

module.exports = router