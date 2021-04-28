var express = require('express');
var model = require('../models/dao');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  model.checkUser((result)=>{
    res.json(result);
  });
});

module.exports = router;
