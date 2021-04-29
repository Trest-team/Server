var express = require('express');
var model = require('../models/dao');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  model.checkUser((result)=>{
    res.json(result);
  });
});

router.post('/login', function (req, res, next) {
  model.login(req.body,(result)=>{
    res.json(result)
  });
});

router.post('/sign-up', function (req, res, next) {
  model.insertMember(req.body,(result)=>{
    if(result == "duplicate"){
      res.status(409).json({error: 'duplicate'});
    }else if(result == "BadRequest"){
      res.status(400).json({error: 'BadRequest'});
    }
    else{
      res.status(200).send()
    }
    
  });
});

router.get('/feel', function (req, res, next) {
  model.checkUserFeel(req.body,(result)=>{
    res.json(result);
  });
});

module.exports = router;
