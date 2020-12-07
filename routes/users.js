const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Profile = require('../models/Profile');

router.get('/api/users/auth', auth, async (req, res) => {
  try {
    const user = await req.user;
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

// Create new User

router.post('/api/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const avatar = await user.getAvatar();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    const errors = [];
    if (e) {
      for (const [key, { message }] of Object.entries(e.errors)) {
        errors.push(message);
      }
    }
    res.status(400).send(errors);
  }
});

// User Login

router.post('/api/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    await user.save();
    res.send({ user, token });
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: e.message });
  }
});

// User Logout

router.post('/api/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).send('User logged out');
  } catch (e) {
    res.status(500).send(e);
  }
});

// User Logout all Tokens

router.post('/api/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send('All User instances logged out');
  } catch (e) {
    res.status(500).send(e);
  }
});

// User Delete Account and Profile

router.delete('/api/users/deleteAccount', auth, async (req, res) => {
  try {
    const user = await req.user;
    if (!user) {
      return res.status(404).json({ msg: 'Could not Delete' });
    }
    const _id = user._id;
    const profile = await Profile.findOne({ owner: _id });
    if (!profile) {
      user.remove();
      return res.status(200).json({ msg: 'Account successfully deleted' });
    } else {
      user.remove();
      profile.remove();
      return res.status(200).json({ msg: 'Account successfully deleted' });
    }
  } catch (e) {
    console.error(e.message);
    res.status(500).send(e.message);
  }
});

module.exports = router;
