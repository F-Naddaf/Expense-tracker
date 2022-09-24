import { expenseTable, dateChecker } from './expenseRow.js';

// checking and showing the search value
export const searchChecker = async (e) => {
  e.preventDefault();
  const expenseName = document.getElementById('input-search').value;
  try {
    const result = await fetch('api/v1/tasks');
    const res = await result.json();
    const expenseArray = res.expenses;
    const filteredItems = res.expenses
      .map((element) => element.name)
      .find((element) => element == expenseName);
    if (filteredItems) {
      const result = expenseArray.filter(
        (element) => element.name === expenseName,
      );
      const expenseSection = document.getElementById('expense-section');
      document.getElementById('input-search').value = '';
      expenseSection.innerHTML = '';
      const showAllExpense = await expenseTable(result);
      expenseSection.appendChild(showAllExpense);
      const showExpenseBtn = document.getElementById('show-btn');
      showExpenseBtn.disabled = false;
      showExpenseBtn.style.backgroundColor = '#024d18';
      dateChecker(result);
      await calculateAmount(result);
    } else {
      failedSearchMessage();
    }
  } catch (error) {
    console.log(error);
  }
};

// calculating the total expense
export const calculateAmount = async (element) => {
  // Total value of the searched expense
  try {
    let expense;
    let total = 0;
    if (element) {
      expense = element.map((item) => {
        total += item.amount;
      });
    }
    // Total value of all the expenses
    else {
      const result = await fetch('api/v1/tasks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const res = await result.json();
      const expense = res.expenses;
      element = expense.map((item) => {
        total += item.amount;
      });
    }
    const totalInput = document.getElementById('input-total');
    totalInput.innerHTML = `€${total}`;
    return element;
  } catch (error) {
    console.log(error);
  }
};

// The searched title not in the database
const failedSearchMessage = () => {
  const expenseSection = document.getElementById('expense-section');
  const searchedName = document.getElementById('input-search').value;
  expenseSection.innerHTML = '';
  const failedSearch = document.createElement('p');
  failedSearch.classList.add('search-not-found');
  failedSearch.innerHTML = `Sorry, can't find the expense name ( ${searchedName} ) may you entered a wrong expense name!`;
  expenseSection.appendChild(failedSearch);
  const showExpenseBtn = document.getElementById('show-btn');
  showExpenseBtn.disabled = false;
  showExpenseBtn.style.backgroundColor = '#024d18';
  document.getElementById('input-search').value = '';
};
