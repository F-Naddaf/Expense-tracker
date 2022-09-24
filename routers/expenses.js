const express = require('express');
const router = express.Router();
const {
  getAllExpenses,
  createExpense,
  getExpense,
  updateExpense,
  deleteExpense,
} = require('../controllers/expense');

router.route('/').get(getAllExpenses).post(createExpense);
router.route('/:name').get(getExpense);
router.route('/:id').patch(updateExpense).delete(deleteExpense);

module.exports = router;
