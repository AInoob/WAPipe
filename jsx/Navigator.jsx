var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
  _handleClick: function(){
    alert('boom!');
  },
  render: function(){
    return(
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/pipe">Pipe</Link></li>
        </ul>
      </nav>
    );
  }
});
