'use strict';

// Failed adding expense popup
export const errorPopup = () => {
  const element = document.createElement('div');
  element.classList.add('error-message');
  element.innerHTML = `
    <div class="popup-container">
      <div class='close-bar'>
        <i id="error-close-x" class="fa-solid fa-x"></i>
        <p class="popup-desc">ERROR</p>
      </div>
      <h1 class="popup-message-top">Sorry!</h1>
      <h2 class="popup-message">You have not entered the data in the fields correctly</h2>
      <button id="error-close-btn">Close</button>
    </div>   
    `;
  return element;
};

// Success adding expense popup
export const expenseAddMessage = () => {
  const element = document.createElement('div');
  element.classList.add('expense-message');
  element.innerHTML = `
    <div class="popup-container">
      <div class='close-bar'>
        <i id="exp-close-x" class="fa-solid fa-x"></i>
        <p class="popup-desc">SUCCESS</p>
      </div>
      <h1 class="success-popup-message-top">Congrats!</h1>
      <h2 class="success-popup-message">Your expense has been add it to your list</h2>
      <button id="exp-close-btn">Close</button>
    </div>   
`;
  return element;
};
