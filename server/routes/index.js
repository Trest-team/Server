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

router.post('/users/sign-up', function (req, res, next) {
  model.insertMember(req.body,(result)=>{
    if(result == "duplicate"){
      res.status(409).json({error: 'duplicate'});
    }else if(result == "BadRequest"){
      res.status(400)
    }
    else{
      res.status(200)
    }
    
  });
});

router.post('/users/login', function (req, res, next) {
  model.login(req.body,(result)=>{
    res.json(result)
  });
});

module.exports = router;
