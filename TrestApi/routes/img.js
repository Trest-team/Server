var express = require('express');
var router = express.Router();
var fs = require('fs');
var model = require('../models/dao');


router.get('/boy', function (req, res, next) {
    var url = "public/images/boy.png"
    fs.readFile(url, function(err, data){
      if(err)throw err;
      res.writeHead(200,{
        "Content-Type" : "image/png"
      });
      res.end(data);
    })
});

router.get('/bot', function (req, res, next) {
    var url = "public/images/bot.png"
    fs.readFile(url, function(err, data){
      if(err)throw err;
      res.writeHead(200,{
        "Content-Type" : "image/png"
      });
      res.end(data);
    })
  });

  
module.exports = router;