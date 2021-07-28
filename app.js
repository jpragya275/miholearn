const express = require('express');
const authController = require('./authController');

const app = express();
app.use(express.json());

const test = (req, res) => {
  console.log(req.body);
  res.status(200).json({
    message: 'success',
    data: req.body
  });
};

app.post('/signup', authController.signup);
app.post('/login', authController.login);
app.get('/hello', authController.protect, authController.getHelloMessage);

const port = 80;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
