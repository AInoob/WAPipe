var React = require('react');
var Helmet = require('react-helmet');
var Navigator = require('../jsx/Navigator.jsx');

module.exports = React.createClass({
  _handleClick: function(){
    alert('boom!');
  },
  render: function(){
    return(
      <html>
        <head>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
          <link rel="stylesheet" type="text/css" href="/css/style.css" />
        </head>
        <body>
        <Navigator />
        <div id="WAPipe">
          <Helmet
            title="WAPipe"
          />
          {this.props.children || "WTF?"}
          <script id="serverProps" dangerouslySetInnerHTML={{
            __html: 'window.PROPS='+JSON.stringify({serverProps:this.props.serverProps})
          }} />
          <script src='/js/bundle.js' />
        </div>
        </body>
      </html>
    );
  }
});
