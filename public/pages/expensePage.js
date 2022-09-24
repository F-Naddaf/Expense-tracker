import { dateChecker, expenseTable } from './expenseRow.js';
import { searchChecker, calculateAmount } from './findExpense.js';
import { errorPopup, expenseAddMessage } from './popup.js';

// Getting all expenses from database
const showAllExpenses = async () => {
  try {
    const expenseSection = document.getElementById('expense-section');
    expenseSection.innerHTML = '';
    const showAllExpense = await expenseTable();
    expenseSection.appendChild(showAllExpense);
    showExpButton.disabled = true;
    showExpButton.style.backgroundColor = '#7a7c7d';
    await calculateAmount();
    const result = await fetch('api/v1/tasks');
    const res = await result.json();
    const expenseArray = res.expenses;
    dateChecker(expenseArray);
  } catch (error) {
    console.log(error);
  }
};

// Controlling the input before adding a new expense to the database
const addingExpense = async (e) => {
  e.preventDefault();
  const name = document.getElementById('input-name').value;
  const date = document.getElementById('input-date').value;
  const amount = document.getElementById('input-amount').value;
  const data = {
    name: name,
    date: date,
    amount: amount,
  };
  try {
    const result = await fetch('api/v1/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    await result.json();
    if (name === '' || date === '' || amount === '') {
      failedInputMessage();
    } else {
      expenseAdded();
    }
  } catch (error) {
    console.log(error);
  }
};

// Show the user that his expense been DELETE it to his database
const failedInputMessage = () => {
  const main = document.querySelector('.main');
  const popup = errorPopup();
  main.appendChild(popup);
  const closeButton = document.getElementById('error-close-btn');
  closeButton.addEventListener('click', () => {
    const closePopup = document.querySelector('.error-message');
    closePopup.remove();
    window.location.reload();
  });
  const closeSimple = document.getElementById('error-close-x');
  closeSimple.addEventListener('click', () => {
    const closePopup = document.querySelector('.error-message');
    closePopup.remove();
    window.location.reload();
  });
  const expenseSection = document.getElementById('expense-section');
  expenseSection.innerHTML = '';
  const showExpButton = document.getElementById('show-btn');
  showExpButton.disabled = false;
  showExpButton.style.backgroundColor = '#024d18';
};

// Show the user that his expense been ADD it to his database
const expenseAdded = () => {
  const main = document.querySelector('.main');
  const popup = expenseAddMessage();
  main.appendChild(popup);
  const closeButton = document.getElementById('exp-close-btn');
  closeButton.addEventListener('click', () => {
    const closePopup = document.querySelector('.expense-message');
    closePopup.remove();
    window.location.reload();
  });
  const closeSimple = document.getElementById('exp-close-x');
  closeSimple.addEventListener('click', () => {
    const closePopup = document.querySelector('.expense-message');
    closePopup.remove();
    window.location.reload();
  });
  const expenseSection = document.getElementById('expense-section');
  expenseSection.innerHTML = '';
  const showExpButton = document.getElementById('show-btn');
  showExpButton.disabled = false;
  showExpButton.style.backgroundColor = '#024d18';
  document.getElementById('input-name').value = '';
  document.getElementById('input-date').value = '';
  document.getElementById('input-amount').value = '';
};

const aboutButton = document.getElementById('about-app');
aboutButton.addEventListener('click', () => {
  window.location = '/about';
});
const addExpButton = document.getElementById('submit-btn');
addExpButton.addEventListener('click', addingExpense);

const showExpButton = document.getElementById('show-btn');
showExpButton.addEventListener('click', showAllExpenses);

const searchButton = document.getElementById('form-search');
searchButton.addEventListener('submit', searchChecker);
