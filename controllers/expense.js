const { date } = require('@hapi/joi');
const expense = require('../models/expense');
const task = require('../models/expense');

const getAllExpenses = async (req, res) => {
  const { userId } = req.params;
  try {
    const expenses = await task.find({ userId: userId });
    res.status(200).json({ expenses, msg: 'all the expanses' });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createExpense = async (req, res) => {
  try {
    const expense = await task.create(req.body);
    res.status(201).json({ expense, status: 'success' });
  } catch (error) {
    res.status(500).json({ msg: error, status: 'failed' });
  }
};

const getExpense = async (req, res) => {
  try {
    const { name: expenseName, id: expenseID } = req.params;
    const expense = await task.findOne({ name: expenseName, _id: expenseID });
    if (!expense) {
      return res
        .status(404)
        .json({ msg: `No expense with a name : ${expenseName}` });
    }
    res.status(200).json({ expense });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id: expenseID } = req.params;
    const expense = await task.findOneAndUpdate({ _id: expenseID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!expense) {
      return res.status(404).json({ msg: `No expense with ID : ${expenseID}` });
    }
    res.status(200).json({ expense, status: 'success' });
  } catch (error) {
    res.status(500).json({ msg: error, status: 'failed' });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id: expenseID } = req.params;
    const expense = await task.findOneAndDelete({ _id: expenseID });
    if (!expense) {
      return res.status(404).json({ msg: `No expense with ID : ${expenseID}` });
    }
    res.status(200).json({ expense, status: 'success' });
  } catch (error) {
    res.status(500).json({ msg: error, status: 'failed' });
  }
};

module.exports = {
  getAllExpenses,
  createExpense,
  getExpense,
  updateExpense,
  deleteExpense,
};
