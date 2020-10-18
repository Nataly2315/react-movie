var express = require('express');
var router = express.Router();

const {signup , login } = require('../controllers/userController');
const {signupValidator, loginValidator }= require('../controllers/userValidation');

const auth = require('../authMiddleware');

router.post('/login', loginValidator, login);

router.post('/signup', signupValidator, signup);

router.get('/:userId', auth ,function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:userId/watch-list', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/:userId/watch-list', function(req, res, next) {
  res.send('respond with a resource');
});



module.exports = router;
