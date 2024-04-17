const Post = require('../models/Post');

// 1. POST /api/posts
module.exports.createPost = async (req, res) => {
    Post.create(req.body)
    .then((post)=>{
        res.status(201).json(post);
    })
    .catch((err)=>{
        res.status(400).json(err);
    });
};

// 2. GET /api/posts
module.exports.getPosts = async (req, res) => {
    Post.find()
    .then((post)=>{
        res.status(200).json(post);
    })
    .catch((err)=>{
        res.status(500).json(err);
    });
};

// 3. GET /api/posts/:id
module.exports.getPostById = async (req, res) => {
    Post.findById(req.params.id)
    .then((post)=>{
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.status(200).json(post);
    })
    .catch((err)=>{
        res.status(500).json(err);
    });
};

// 4. PATCH /api/posts/:id
module.exports.updatePost = async (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body,{
    new:true, runValidators:true
  })
    .then((post)=>{
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.status(200).json(post);
    })
    .catch((err)=>{
        res.status(500).json(err);
    });
};

// 5. DELETE /api/posts/:id
module.exports.deletePost = async (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then((post)=>{
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.status(204).send();
    })
    .catch((err)=>{
        res.status(500).json(err);
    });
};
