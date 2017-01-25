var React = require('react');
var Link = require('react-router').Link;
var IOItem = require('../jsx/IOItem.jsx');

module.exports = React.createClass({
  getInitialState: function(){
    return {};
  },
  componentDidMount: function(){
  },
  handlePaste: function(e){
    var target=document.getElementById('pipeIn');
  },
  addItem: function(e){
    var html=$(e.target).parent().find('.IOItemNew').html();
    var text=$(e.target).parent().find('.IOItemNew').text();
    $(e.target).parent().find('.IOItemNew').html('');
    var type;
    if(html==text){
      type='text/plain';
    }
    else{
      type='text/html';
    }
    this.props.addItem({type:type,value:html});
  },
  upload: function(e){
    fileList=e.target.files;
    for(var i=0;i<fileList.length;i++){
      this.props.addItem({type:'file',value:fileList[i]});
    }
  },
  handleDrag: function(e){
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer = e.dataTransfer;
    e.dataTransfer.dropEffect = 'copy';
  },
  handleDrop: function(e){
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer = e.dataTransfer;
    fileList=e.dataTransfer.files;
    for(var i=0;i<fileList.length;i++){
      this.props.addItem({type:'file',value:fileList[i]});
    }
  },
  displayItemNew: function(){
    if(this.props.isIn){
      return(
        <div className="IONew">
          <div className="title">Add more...</div>
          <div className="IOItemNew" onPaste={this.handlePaste} contentEditable="true" data-text="Text / HTML"></div>
          <input type="file" className="hidden" multiple="multiple" onChange={this.upload} id={this.props.id+'_input'}/>
          <label className="fileInput" onDragOver={this.handleDrag} onDrop={this.handleDrop} htmlFor={this.props.id+'_input'}></label>
          <div className="add" onClick={this.addItem}>Add</div>
        </div>
      );
    }
  },
  display: function(){
    var className='app-in';
    if(!this.props.isIn){
      className='app-out';
    }
    var IOItems=this.props.items.map(function(item,index){
      return (
        <IOItem isIn={this.props.isIn} index={index} removeItem={this.props.removeItem.bind(null,index)} updateItem={this.props.updateItem.bind(null,index)} key={index} item={item} />);
      }.bind(this));
    return (
      <div className={className}>
        {IOItems}
        {this.displayItemNew()}
      </div>
    );
  },
  render: function(){
    return(
      <div id={this.props.id}>
        {this.display()}
      </div>
    );
  }
});
