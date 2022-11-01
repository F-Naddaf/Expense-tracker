const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { userRegisterSchema, userLoginSchema } = require('./validation');

// Create a new user in database
router.post('/register', async (req, res) => {
  // Validate the data before making a user
  const { error } = userRegisterSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  try {
    // Checking if user email already exist
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(400).json({ msg: 'Email is already exist' });
    }
    // Hashing the password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Creating a new user
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashPassword,
      birth: req.body.birth,
      gender: req.body.gender,
    });

    await user.save();
    res.status(200).json({ msg: 'You have been registered successfully' });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login
router.post('/login', async (req, res) => {
  // Validate the data before making a user
  try {
    const { error } = userLoginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }
    // Checking if user already exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .header(token)
        .status(400)
        .json({ msg: 'No user found, with the given email' });
    }
    // Checking the password if is valid
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password,
    );
    if (!validPassword) {
      return res.status(400).json({ msg: 'email / password does not match!' });
    }
    // Create a token and assign it
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: '1d',
    });

    // Control the token to be expire in 1 day
    let currentToken = user.token;
    if (currentToken) {
      currentToken.filter((t) => {
        const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
        if (timeDiff < 48600) {
          return t;
        }
      });
    }
    await User.findByIdAndUpdate(user._id, {
      token: [{ token, signedAt: Date.now().toString() }],
    });
    res.status(200).cookie('token', token).json({ msg: 'Logged in!', token });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
