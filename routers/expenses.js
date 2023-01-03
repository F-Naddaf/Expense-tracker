const express = require('express');
const router = express.Router();
const {
  getAllExpenses,
  createExpense,
  getExpense,
  updateExpense,
  deleteExpense,
} = require('../controllers/expense');

router.route('/').post(createExpense);
router.route('/:userId').get(getAllExpenses);
router.route('/:name').get(getExpense);
router.route('/:id').patch(updateExpense).delete(deleteExpense);

module.exports = router;
