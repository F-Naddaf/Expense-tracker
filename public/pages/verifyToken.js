const jwt = require('jsonwebtoken');

const cookieJwAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!req.cookies.token) {
      return res.redirect('login');
    }
    if (!token) {
      return res.redirect('login');
    } else {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = { id: verified._id };
      next();
    }
  } catch (error) {
    res.clearCookie('token').redirect('login');
  }
};

module.exports = cookieJwAuth;
