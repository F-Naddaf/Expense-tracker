const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {},
  password: {
    type: String,
  },
  birth: {
    type: Date,
  },
  gender: {
    type: String,
  },
  token: [{ type: Object }],
});

module.exports = mongoose.model('user', userSchema);
