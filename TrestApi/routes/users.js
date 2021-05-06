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
      try {
        const id = req.body.userid;
    
        // jwt.sign() 메소드: 토큰 발급
        const token = jwt.sign({
          id,
        }, process.env.JWT_SECRET, {
          expiresIn: '1m', // 1분
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

router.get('/feel', function (req, res, next) {
  model.checkUserFeel(req.body,(result)=>{
    res.json(result);
  });
});

module.exports = router;
