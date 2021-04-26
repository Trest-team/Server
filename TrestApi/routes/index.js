var express = require('express');
var router = express.Router();
var model = require('../models/dao');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/user', function (req, res, next) {
  model.checkUser((result)=>{
    res.json(result);
  });
});

module.exports = router;
