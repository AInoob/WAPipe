require('babel-register')({
    presets: ['es2015','react']
});
var express = require('express');
var app = express();
var app2 = express();
var https = require('https');
var MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const sssl={
    key: fs.readFileSync('private/wapipe.key'),
    cert: fs.readFileSync('private/wapipe.crt')
}
var server = {};
server.visiters = new Map();
app.use(express.static('public'));

app.all('*',function(req,res,next){
  var host=req.header('host');
  if(host&&host.match(/^www./i)){
    res.redirect('https://'+host.replace(/^www\./i,'')+req.originalUrl);
  }
  else{
    next();
  }
});

app.use(require('./routes/index.jsx'));

https.createServer(sssl,app).listen(443);

//http redirection
app2.get('/*',function(req,res){
  var newURL=req.originalUrl.match(/(.*)/m)[1];
  res.redirect('https://wapipe.com'+newURL);
});

app2.listen(80);

