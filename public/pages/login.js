const formButtons = (e) => {
  e.preventDefault();
  const signUpButton = document.getElementById('signUp-btn');
  const logInButton = document.getElementById('login-btn');
  signUpButton.addEventListener('click', dollarAnimation);
  logInButton.addEventListener('click', dollarAnimation);
  const form = document.getElementById('log-in-section');
  form.addEventListener('submit', loginController);
};

// Animating the dollars before loading the register page
function dollarAnimation() {
  let moneyPositionY = 70;
  let moneyPositionX = 30;
  const movingY = 4;
  const movingX = 1;
  let move = setInterval(() => {
    const ul = document.getElementById('wallet-ul');
    moneyPositionY += movingY;
    moneyPositionX += movingX;
    let dollarImageX = document.getElementById('wallet-dollar');
    dollarImageX.style.marginBottom = `${moneyPositionY}px`;
    let dollarImageY = document.getElementById('wallet-dollar');
    dollarImageY.style.marginLeft = `${moneyPositionX}px`;

    ul.appendChild(dollarImageY);
    ul.appendChild(dollarImageX);

    if (dollarImageX.style.marginLeft === '51px') {
      clearInterval(move);
    }
  }, 20);
  setTimeout(loadingRegisterPage, 500);
}

const loadingRegisterPage = () => {
  window.location = '/register';
};

// Controlling the input before logging in and loading the expense page
const loginController = async (e) => {
  e.preventDefault();
  const userInput = document.getElementById('input-user').value;
  const passwordInput = document.getElementById('input-pass').value;
  const data = {
    email: userInput,
    password: passwordInput,
  };
  try {
    const result = await fetch('auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const res = await result.json();
    if (res.msg == 'Logged in!') {
      localStorage.clear();
      localStorage.setItem('userId', res.id);
      window.location = '/expense';
    } else {
      const message = document.querySelector('.failed-login-message');
      message.style.display = 'block';
      message.innerHTML = res.msg;
    }
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener('load', formButtons);
