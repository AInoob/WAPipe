var React = require('react');
var Helmet = require('react-helmet');
var Link = require('react-router').Link;

module.exports = React.createClass({
  _handleClick: function(){
    alert('This is home!');
  },
  render: function(){
    return(
      <div>
        <Helmet
          title="Home - WAPipe"
        />
        <p>Home</p>
        <h2>App list</h2>
        <ul>
          <li><Link to="/pipe/md5">MD5 Generator</Link></li>
          <li><Link to="/pipe/base64">Base64 encoding and decoding</Link></li>
          <li><Link to="/pipe/sha1">SHA1 Generator</Link></li>
          <li><Link to="/pipe/md4">MD4 Generator</Link></li>
        </ul>
        <br />
        <p>WAPipe (Web App Pipe) is a website that provides you many useful apps that runs on your browser.</p>
        <p>As a user, you can create your own pipes by drag different tools together, you can get a share of our revenue if people use your pipes!</p>
        <p>As a developer, you can submit your apps, and get a share of our revenue if people use your apps in pipes</p>
        <button onClick={this._handleClick}>Go</button>
      </div>
    );
  }
});
