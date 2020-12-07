const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Post = require('../models/Posts');
const Profile = require('../models/Profile');
const User = require('../models/User');

// Create a Post

router.post('/api/posts', auth, async (req, res) => {
  const text = req.body.text;
  const user = await req.user;
  const { avatar, name, id } = user;

  try {
    if (!user) {
      throw new Error('Please authenticate...');
    }
    const post = new Post({
      user: id,
      avatar,
      name,
      text,
    });
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.error({ msg: error.message });
    res.json({ msg: error.message });
  }
});

// Get a Post by ID

router.get('/api/posts/post/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const post = await Post.findById({ _id });
    if (!post) {
      return res.status(404).json({ msg: 'Post not found...' });
    }
    res.status(200).json(post);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found...' });
    }
    res.status(500).json({ msg: error.message });
  }
});

// Get All Posts

router.get('/api/posts/all', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    if (!posts) {
      return res.status(404).json({ msg: 'No posts found...' });
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// Delete a Post

router.delete('/api/posts/delete/:id', auth, async (req, res) => {
  const user = await req.user;
  const { id } = user;
  const _id = req.params.id;
  try {
    const post = await Post.findById({ _id });
    if (!post) {
      return res.status(404).json({ msg: 'Post not found...' });
    }

    if (id !== post.user.toString()) {
      return res.status(401).json({ msg: 'Unauthorized request' });
    }
    await post.remove();
    res.status(200).json({ msg: 'Post successfully deleted' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      res.status(404).json({ msg: 'Post not found...' });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Like a Post

router.patch('/api/posts/like/:id', auth, async (req, res) => {
  const _id = req.params.id;
  const user = await req.user;
  const { id } = user;
  try {
    const post = await Post.findById({ _id });
    const liked = post.likes.filter((like) => like.user.toString() === id);
    if (liked.length > 0) {
      return res.status(400).json({ msg: 'You already like this...' });
    }
    post.likes.unshift({ user: id });
    await post.save();
    res.status(200).json(post.likes);
  } catch (error) {
    res.status(500).send('Server Error...');
  }
});

// UnLike a Post

router.patch('/api/posts/unlike/:id', auth, async (req, res) => {
  const _id = req.params.id;
  const user = await req.user;
  const { id } = user;
  try {
    const post = await Post.findById({ _id });
    const liked = post.likes.filter((like) => like.user.toString() === id);
    if (liked.length === 0) {
      return res.status(400).json({ msg: 'Post has not yet been liked...' });
    }
    post.likes = post.likes.filter((like) => like.user.toString() !== id);
    await post.save();
    res.status(200).json(post.likes);
  } catch (error) {
    res.status(500).send('Server Error...');
  }
});

// Comment on a Post

router.post('/api/posts/comment/:id', auth, async (req, res) => {
  const _id = req.params.id;
  const text = req.body.text;
  const user = await req.user;
  const { avatar, name, id } = user;

  try {
    const post = await Post.findById({ _id });
    if (!post) {
      return res.status(404).json({ msg: 'Post not found...' });
    }
    if (!user) {
      throw new Error('Please authenticate...');
    }
    const comment = {
      user: id,
      avatar,
      name,
      text,
    };
    post.comments.unshift(comment);
    await post.save();
    res.status(200).send(post.comments);
  } catch (error) {
    console.error({ msg: error.message });
    res.json({ msg: error.message });
  }
});

// Delete a Comment

router.delete('/api/posts/comment/:id/:comment_id', auth, async (req, res) => {
  const user = await req.user;
  const { id } = user;
  const _id = req.params.id;

  try {
    const post = await Post.findById({ _id });
    if (!post) {
      return res.status(404).json({ msg: 'Post does not exist...' });
    }
    // Pull out the comment to delete
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist...' });
    }
    // Check user auth
    if (comment.user.toString() !== id) {
      return res
        .status(401)
        .json({ msg: 'Not Authorized to delete this comment...' });
    }

    post.comments = post.comments.filter((el) => el.id !== comment.id);
    await post.save();
    res.status(200).send(comment.id);
  } catch (error) {
    console.error(error.message);
    res.json({ msg: error.message });
  }
});

// Edit a comment

router.patch('/api/comment/edit/:id/:comment_id', auth, async (req, res) => {
  const user = await req.user;
  const { id } = user;
  const _id = req.params.id;
  const editText = req.body.text;

  try {
    // Check editText
    if (editText === undefined) {
      return res.status(400).json({ msg: 'An edit must contain some text...' });
    } else if (editText.length === 0) {
      return res.status(400).json({ msg: 'An edit must contain some text...' });
    }
    // Get the Post
    const post = await Post.findById({ _id });
    if (!post) {
      return res.status(404).json({ msg: 'Post does not exist...' });
    }
    // Pull out the comment to edit
    let comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist...' });
    }
    // Check user auth
    if (comment.user.toString() !== id) {
      return res
        .status(401)
        .json({ msg: 'Not Authorized to edit this comment...' });
    }
    comment.text = editText;
    comment.date = Date.now();
    await post.save();
    res.status(200).json(comment);
  } catch (error) {
    res.json({ msg: error.message });
  }
});

module.exports = router;
