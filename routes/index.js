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

router.post('/api/users', async (req, res) => {
  try {
    if(!req?.body?.username || !req?.body?.password || !req?.body?.email) {
      return res.send({
        status: 404,
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
        status: 201,
        token: createUser.token,
        message: `User ${username} was created successfully.`,
        data: 'no user data to return'
      });
    } else {
      res.send({
        status: 409,
        message: 'User already exists'
      });
    }
  } catch (err) {
    res.send({
      status: 500,
      message: 'There was an error',
      error: err
    });
  }
});

router.post('/api/login', async (req, res) => {
  try {
    if(!req?.body?.username || !req?.body?.password) {
      return res.send({
        status: 404,
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
        status: 200,
        token,
        message: 'Login Successful',
        data: 'no user data to return'
      });
    } else {
      res.send({
        status: 404,
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