const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');

router.get('/health', (req, res) => {
  res.send({
    status: 200,
    message: 'API is healthy and responding'
  });
});

router.get('/health-check', (req, res) => {
  res.send({
    status: 200,
    message: 'API is healthy and responding'
  });
});

router.post('/api/users', async (req, res) => {
  try {
    if(!req?.body?.username || !req?.body?.password || !req?.body?.email) {
      return res.send({
        status: 400,
        error: 'Missing Fields'
      });
    }
  
    const username = req.body.username;
    const doesUserExist = await User.find( { 'username': username } );
  
    if(doesUserExist.length === 0) {
      const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPTSALT));
      const password = await bcrypt.hash(req.body.password, salt);
      const createUser = new User({
        username,
        password,
        email: req.body.email,
        isAdmin: false
      });

      createUser.token = jwt.sign({
        id: createUser._id,
        username,
        date: new Date()
      }, process.env.JWT_SECRET);

      await createUser.save();

      res.send({
        token: createUser.token,
        message: `User ${username} was created successfully.`,
        result: createUser
      });
    } else {
      res.send({
        message: 'User already exists'
      });
    }
  } catch (err) {
    res.send({
      message: 'There was an error',
      error: err
    });
  }
});

router.post('/api/login', async (req, res) => {
  try {
    if(!req?.body?.username || !req?.body?.password) {
      return res.send({
        error: 'Missing Fields'
      });
    }
  
    const username = req.body.username;
    const userCheck = await User.find( { 'username': username } );
    const passwordCheck = await bcrypt.compare(req.body.password, userCheck[0].password);
  
    if(passwordCheck) {
      const token = jwt.sign({
        id: userCheck[0]._id,
        username,
        date: new Date()
      }, process.env.JWT_SECRET);

      await User.updateOne({_id: userCheck[0]._id }, { $set: {token}});

      res.send({
        token,
        message: 'Login Successful'
      });
    } else {
      res.send({
        status: 403,
        message: 'Username/Password incorrect'
      });
    }
  } catch (err) {
    res.send({
      status: 500,
      message: 'There was an error'
    });
  }
});

module.exports = router;