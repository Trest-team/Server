var express = require('express');
var model = require('../models/dao');
const jwt = require('jsonwebtoken');
var router = express.Router();
const { verifyToken } = require('./middlewares');

/* GET users listing. */
router.get('/', function(req, res, next) {
  model.checkUser((result)=>{
    res.json(result);
  });
});

router.post('/login', function (req, res, next) {
  model.login(req.body,(result)=>{
    if(result == "BadRequest"){
      res.status(400).json({error: 'BadRequest'});
    }else if(result == '500'||result == 'error'){
      res.status(500).json({error: 'server error'})
    }else{
      res.json({
        code: 200,
        message: '토큰이 발급되었습니다.',
        result,
      });
    }
  });
});

router.post('/token-login', verifyToken, (req, res) => {
  res.json(req.decoded.id);
});


router.post('/sign-up', function (req, res, next) {
  model.insertMember(req.body,(result)=>{
    if(result == "duplicate"){
      res.status(409).json({error: 'duplicate'});
    }else if(result == "BadRequest"){
      res.status(400).json({error: 'BadRequest'});
    }
    else{
      try {  
        return res.json({
          code: 200,
          message: '회원가입 성공.'
        });
      }
    
      catch (error) {
        console.error(error);
        return res.status(500).json({
          code: 500,
          message: '서버 에러',
        });
      }
    }
    
  });
});

router.get('/feel', function (req, res, next) {
  model.checkUserFeel(req.body,(result)=>{
    res.json(result);
  });
});

module.exports = router;
