import React from 'react';
import ReactRouter from 'react-router';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import ReactGA from 'react-ga';

var fireTracking=function(){}

if(typeof window ==='object'){
  ReactGA.initialize('UA-86904809-1');
  console.log('client side initialization');
  var createElement=function(Component, props){
    return <Component {...props} {...window.PROPS} />
  }
  fireTracking=function(){
    ReactGA.pageview(window.location.pathname);
  }
}

module.exports = (
  <Router onUpdate={fireTracking} history={browserHistory} createElement={createElement}>
    <Route path='/' component={require('../jsx/Core.jsx')}>
      <IndexRoute component={require('../jsx/Home.jsx')} />
      <Route path='pipe' component={require('../jsx/Pipe.jsx')} />
      <Route path='pipe/*' component={require('../jsx/Pipe.jsx')} />
    </Route>
  </Router>
)
