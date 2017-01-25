import React from 'react';
var ReactDOMServer = require('react-dom/server');
var ReactRouter = require('react-router');
import Helmet from 'react-helmet';
import express from 'express';
var router = express.Router();
router.get('*',function(req,res){
  var serverProps = {serverProps:{
    title: 'Universal React',
    pipe: []
  }};
  var url=decodeURI(req.originalUrl);
  if(url.match(/^\/pipe\/.+/)){
    url=url.replace(/^\/pipe\//,'');
    var pipe=url.split('?')[0].split('|')||[];
    console.log('pipe'+pipe);
    serverProps.serverProps.pipe=pipe;
    console.log(pipe);
    var paramList=[];
    paramList.length=pipe.length;
    paramList.fill({});
    var temp=url.split('?')[1];
    if(temp){
      paramList=JSON.parse(decodeURI(temp));
    }
    serverProps.serverProps.paramList=paramList;
    console.log(paramList);
  }
  ReactRouter.match({
    routes: require('./routes.jsx'),
    location: req.url
  }, function(err, redirectLocation, renderProps){
    if(renderProps){
      var WAPipe = ReactDOMServer.renderToString(
        <ReactRouter.RouterContext {...renderProps} 
          createElement={function(Component, renderProps){
            return <Component {...renderProps} {...serverProps} />;
          }}
        />
      );
      Helmet.rewind();
      res.send('<!doctype html>'+WAPipe);
    } else{
      res.status(404).send('Not Found');
    }
  });
  
});

module.exports = router;
