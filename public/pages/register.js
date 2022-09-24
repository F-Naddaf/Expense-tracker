// Controlling the input before adding the user info to the database
const registerSection = async (e) => {
  e.preventDefault();
  const firstName = document.getElementById('input-user-first').value;
  const lastName = document.getElementById('input-user-last').value;
  const email = document.getElementById('input-user-email').value;
  const password = document.getElementById('input-user-pass').value;
  const repeat_password = document.getElementById('input-user-conf-pass').value;
  const birth = document.getElementById('input-user-birth-date').value;
  const gender = document.querySelector('.gender').value;
  const data = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    repeat_password: repeat_password,
    birth: birth,
    gender: gender,
  };
  try {
    const result = await fetch('auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const res = await result.json();
    if (res.msg == 'You have been registered successfully') {
      const message = document.querySelector('.failed-login-message');
      message.style.display = 'block';
      message.style.color = '#056121';
      message.innerHTML = res.msg;
      setTimeout(loadingLoginPage, 1500);
    } else {
      const message = document.querySelector('.failed-login-message');
      message.style.display = 'block';
      message.style.color = 'red';
      message.innerHTML = res.msg;
    }
  } catch (error) {
    console.log(error);
  }
};

// Freezing for 1.5 second before loading the login page
const loadingLoginPage = () => {
  window.location = '/login';
};

const registerButton = document.getElementById('register-btn');
registerButton.addEventListener('click', registerSection);

const backButton = document.getElementById('back-btn');
backButton.addEventListener('click', () => {
  window.location = '/login';
});
