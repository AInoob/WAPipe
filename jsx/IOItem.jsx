var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
  getInitialState: function(){
    return {};
  },
  componentDidMount: function(){
  },
  changeType: function(e){
    this.props.updateItem('type',e.target.value);
  },
  displaySelect: function(){
    var value;
    if(this.props.item){
      value=this.props.item.type;
    }
    return (
      <select className="typeSelect" onChange={this.changeType} value={value}>
        <option value="text/plain">text/plain</option>
        <option value="text/html">text/html</option>
        <option value="dataURI">dataURI</option>
        <option value="file">file</option>
      </select>
    );
  },
  displayTitle: function(){
    var title='Input ';
    if(!this.props.isIn){
      title='Output ';
    }
    return <span className="title">{title+this.props.index}</span>
  },
  handleChange: function(e){
    if(this.props.isIn){
      this.props.updateItem('value',e.target.value);
    }
  },
  display: function(){
    var type;
    var value;
    if(this.props.item){
      type=this.props.item.type;
      value=this.props.item.value;
    }
    switch(type){
      case "dataURI":
        return <a href={value}>dataURI</a>
      case "text/html":
        return <div dangerouslySetInnerHTML={{__html:value}}></div>
      default: 
        return <textarea onChange={this.handleChange} value={value}></textarea>
    }
  },
  render: function(){
    return(
      <div className="IOItem">
        {this.displaySelect()}
        {this.displayTitle()}
        <button className="close" onClick={this.props.removeItem}>x</button>
        {this.display()}
      </div>
    );
  }
});
