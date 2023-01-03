const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Must provide a name'],
    trim: true,
    maxLength: [40, "Name can't be more than 40 characters"],
  },
  date: {
    type: Date,
    required: [true, 'Must provide a date'],
  },
  amount: {
    type: Number,
    required: [true, 'Must provide an amount'],
  },
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
});

module.exports = mongoose.model('expense', expenseSchema);
