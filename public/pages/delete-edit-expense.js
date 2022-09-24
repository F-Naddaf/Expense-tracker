import { calculateAmount } from './findExpense.js';

// Deleting an row of expense
export const deleteExpense = async (event) => {
  const id = event.target.id;
  try {
    const result = await fetch(`api/v1/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res = await result.json();
    if (res.status == 'success') {
      await calculateAmount();
      const btn = event.target;
      btn.closest('tr').remove();
    }
  } catch (error) {
    console.log(error);
  }
};

// Getting the targeted expense
export const updateStructure = async (event) => {
  const id = event.target.id;
  try {
    const result = await fetch(`api/v1/tasks`);
    const res = await result.json();
    const expenseArray = res.expenses;
    if (id) {
      const result = expenseArray.filter((element) => element._id === id);
      result.forEach(async (expense) => {
        await editSection(
          expense.name,
          expense.date,
          expense.amount,
          expense._id,
        );
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// Creating a popup of targeted expense
const editSection = async (name, date, amount, id) => {
  try {
    const main = document.querySelector('.main');

    const element = document.createElement('div');
    element.classList.add('update-popup');
    main.appendChild(element);

    const form = document.createElement('form');
    form.id = 'edit-form';
    form.classList.add('edit-container');
    element.appendChild(form);

    const closeBar = document.createElement('div');
    closeBar.classList.add('close-bar');
    form.appendChild(closeBar);

    const closeTag = document.createElement('i');
    closeTag.classList.add('fa-solid');
    closeTag.classList.add('fa-x');
    closeTag.id = 'edit-close-x';
    closeBar.appendChild(closeTag);

    const labelName = document.createElement('label');
    labelName.classList.add('edit-label');
    labelName.textContent = 'Name:';
    form.appendChild(labelName);

    const inputName = document.createElement('input');
    inputName.classList.add('edit-input');
    inputName.id = 'edit-input-name';
    inputName.value = name;
    form.appendChild(inputName);

    const labelDate = document.createElement('label');
    labelDate.classList.add('edit-label');
    labelDate.textContent = 'Date:';
    form.appendChild(labelDate);

    const dateType = date;
    const dateObj = new Date(dateType);
    const formatDate = dateObj.toLocaleString('en-GB', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    const inputDate = document.createElement('input');
    inputDate.classList.add('edit-input');
    inputDate.id = 'edit-input-date';
    inputDate.value = formatDate;
    inputDate.setAttribute('type', 'date');
    inputDate.setAttribute('placeholder', formatDate);
    form.appendChild(inputDate);

    const labelAmount = document.createElement('label');
    labelAmount.classList.add('edit-label');
    labelAmount.textContent = 'Amount:';
    form.appendChild(labelAmount);

    const inputAmount = document.createElement('input');
    inputAmount.classList.add('edit-input');
    inputAmount.id = 'edit-input-amount';
    inputAmount.value = amount;
    form.appendChild(inputAmount);

    const submitButton = document.createElement('button');
    submitButton.id = id;
    submitButton.classList.add('submitButton');
    submitButton.textContent = 'Save';
    submitButton.addEventListener('click', expenseUpdated);
    form.appendChild(submitButton);
    closePopup();
  } catch (error) {
    console.log(error);
  }
};

//
const closePopup = () => {
  const closeSymbol = document.getElementById('edit-close-x');
  closeSymbol.addEventListener('click', () => {
    const closeEditPopup = document.querySelector('.update-popup');
    closeEditPopup.remove();
  });
};

const expenseUpdated = async (event) => {
  event.preventDefault();
  const id = event.target.id;
  const newName = document.getElementById('edit-input-name').value;
  const newDate = document.getElementById('edit-input-date').value;
  const newAmount = document.getElementById('edit-input-amount').value;
  try {
    const result = await fetch(`api/v1/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newName,
        date: newDate,
        amount: newAmount,
      }),
    });
    await result.json();
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
