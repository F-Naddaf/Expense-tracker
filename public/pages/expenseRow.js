import { expenseRowView } from './expense-view.js';

export const expenseTable = async (expensesArray) => {
  try {
    // Find expense by name
    let expenseTransactions;
    if (expensesArray) {
      expenseTransactions = expensesArray;

      // Getting all the expenses
    } else {
      const result = await fetch('api/v1/tasks');
      const res = await result.json();
      expenseTransactions = res.expenses;
    }

    // No any expense in db
    if (expenseTransactions.length < 1) {
      const element = document.createElement('div');
      element.classList.add('empty-list-msg');
      element.innerHTML = `<h3 class="empty-list">There is no expense in your list</h3>`;
      return element;

      // Expense table structure
    } else {
      const element = document.createElement('div');
      element.classList.add('expense');
      const section = document.createElement('section');
      section.classList.add('section');
      section.id = 'section';
      element.appendChild(section);
      const table = document.createElement('table');
      table.id = 'table';
      // Creating a table header
      const tableHeader = document.createElement('tr');
      tableHeader.id = 'table-header';
      tableHeader.innerHTML = `
      <th id="table-name">Name</th>
      <th id="table-date">Date</th>
      <th id="table-amount">Amount</th>
      <th id="del-edit">Edit/Del</th>
    `;

      // Creating a table body
      const tableBody = document.createElement('tbody');
      tableBody.id = 'table-body';

      table.appendChild(tableHeader);
      table.appendChild(tableBody);
      section.appendChild(table);

      // Creating a total block
      const totalSection = document.createElement('div');
      totalSection.id = 'total';
      totalSection.innerHTML = `
      <label class="total"> Total:</label>
      <p id="input-total"></p>
      `;
      section.appendChild(totalSection);

      // Adding each expense in individual row
      expenseTransactions.forEach(async (expense) => {
        const row = await expenseRowView(
          expense.name,
          expense.date,
          expense.amount,
          expense._id,
        );
        tableBody.appendChild(row);
      });
      return element;
    }
  } catch (error) {
    console.log(error);
  }
};

export const dateChecker = (resultArray) => {
  try {
    const expensesDate = resultArray.map((element) => {
      const date = new Date(element.date).getTime();
      return { id: element._id, date };
    });
    // Current date
    const currentDate = new Date().getTime();
    // Three days later
    const threeDaysLater = new Date(new Date().getTime() + 72 * 60 * 60 * 1000);
    // One week later
    const aWeekLater = new Date(new Date().getTime() + 168 * 60 * 60 * 1000);

    for (let i = 0; i < expensesDate.length; i++) {
      if (
        expensesDate[i].date <= threeDaysLater &&
        expensesDate[i].date >= currentDate
      ) {
        const row = document.getElementById(`row-${expensesDate[i].id}`);
        row.classList.add('almost-expire-expense');
      }
      if (
        expensesDate[i].date <= aWeekLater &&
        expensesDate[i].date >= threeDaysLater
      ) {
        const row = document.getElementById(`row-${expensesDate[i].id}`);
        row.classList.add('week-to-expire-expense');
      }
      if (expensesDate[i].date < currentDate) {
        const row = document.getElementById(`row-${expensesDate[i].id}`);
        row.classList.add('expire-expense');
      }
    }
  } catch (error) {
    console.log(error);
  }
};
