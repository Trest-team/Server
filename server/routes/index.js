var express = require('express');
var router = express.Router();
var model = require('../models/DAO');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/users', function (req, res, next) {
  model.checkUser((result)=>{
    res.json(result);
  });
});


module.exports = router;
