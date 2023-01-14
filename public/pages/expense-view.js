import { deleteExpense, updateStructure } from './delete-edit-expense.js';

export const expenseRowView = async (name, date, amount, id) => {
  try {
    const row = document.createElement('tr');
    row.classList.add('expense-row');
    row.id = `row-${id}`;

    // Adding the new expense name to the table
    const newName = document.createElement('td');
    newName.textContent = name;
    row.appendChild(newName);

    // Adding and styling the date value in the table
    const newDate = document.createElement('td');
    const dateObj = new Date(date);
    const formatDate = dateObj.toLocaleString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    newDate.innerText = formatDate;
    row.appendChild(newDate);

    // Adding the new expense amount to the table
    const newAmount = document.createElement('td');
    newAmount.textContent = `€${amount}`;
    row.appendChild(newAmount);

    // Creating edit and delete icon
    const icons = document.createElement('td');
    const editIcon = document.createElement('i');
    editIcon.classList.add('fa-solid', 'fa-pen-to-square');
    editIcon.id = id;
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa-solid', 'fa-trash-can', 'delete-btn');
    deleteIcon.id = id;
    deleteIcon.addEventListener('click', deleteExpense);
    editIcon.addEventListener('click', updateStructure);
    row.appendChild(icons);
    icons.appendChild(editIcon);
    icons.appendChild(deleteIcon);
    return row;
  } catch (error) {
    console.log(error);
  }
};
