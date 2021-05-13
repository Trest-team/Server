var express = require('express');
var model = require('../models/consultantDao');
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
    }else if(result == 'sql error'){
      res.status(500).json({error: 'serverError'})
    }
    else{
      try {
        const id = req.body.idconsultant;
    
        // jwt.sign() 메소드: 토큰 발급
        const token = jwt.sign({
          id,
        }, process.env.JWT_SECRET, {
          expiresIn: '10m', // 1시간
        });
    
        return res.json({
          code: 200,
          message: '토큰이 발급되었습니다.',
          token,
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

router.post('/profile-update', verifyToken, (req, res) => {
  model.ProfileUpdate(req.body,req.decoded.id,(result)=>{
    if(result == '500'||result == 'error'){
      res.status(500).json({error: 'server error'})
    }else{
      res.status(201).json(result);
    }
  });
});

module.exports = router;
