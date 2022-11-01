require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const tasks = require('./routers/expenses');
const authRoute = require('./routers/auth');
const connectDB = require('./database/connect');
const cookieJwAuth = require('./public/pages/verifyToken');

// middleware
app.set('view engine', 'pug');
app.use(express.static('./public'));
app.use(express.json());
app.use(cookieParser());

app.get('/login', (_req, res) => {
  res.render('login');
});

app.get('/register', (_req, res) => {
  res.render('register');
});

app.get('/expense', cookieJwAuth, (_req, res) => {
  res.render('expense');
});
app.get('/about', cookieJwAuth, (_req, res) => {
  res.render('about');
});

// routes
app.use('/api/v1/tasks/', tasks);
app.use('/auth', authRoute);

const PORT = process.env.PORT || 5550;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`server is listening on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
