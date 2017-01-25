var React = require('react');
var App = require('../jsx/App.jsx')
var Helmet = require('react-helmet');
var update = require('react-addons-update');
var IOBoard = require('../jsx/IOBoard.jsx');

module.exports = React.createClass({
  getInitialState: function(){
    var pipe;
    var paramList;
    if(typeof window ==='object'){
      var url=decodeURI(window.location.pathname);
      url=url.replace(/^\/pipe\/?/,'');
      pipe=url.split('?')[0].split('|')||[];
      if(pipe[0]==""){
        pipe=[];
      }
      paramList=[];
      paramList.length=pipe.length;
      for(var i=0;i<paramList.length;i++){
        paramList[i]={};
      }
      var temp=url.split('?')[1];
      if(temp){
        paramList=JSON.parse(decodeURI(temp));
      }
    }
    else{
      pipe=this.props.serverProps.pipe;
      paramList=this.props.serverProps.paramList;
    }
    return {pipe:pipe,appSet:null,inputList:[{type:'text/plain',value:''}],paramList:paramList,appInfos:{}};
  },
  //shouldComponentUpdate: function(nextProps,nextState){
  //  return false;
  //},
  componentWillReceiveProps: function(props){
    var pipe,paramList;
    if(typeof window ==='object'){
      var url=decodeURI(props.location.pathname);
      url=url.replace(/^\/pipe\/?/,'');
      pipe=url.split('?')[0].split('|')||[];
      if(pipe[0]==""){
        pipe=[];
      }
      paramList=[];
      paramList.length=pipe.length;
      for(var i=0;i<paramList.length;i++){
        paramList[i]={};
      }
      var temp=url.split('?')[1];
      if(temp){
        paramList=JSON.parse(decodeURI(temp));
      }
      this.setState({pipe:pipe,paramList:paramList});
    }
  },
  componentDidMount: function(){
  },
  handleOutputList: function(appIndex,outputList){
    if(appIndex<Object.keys(this.refs).length-1){
      this.refs['app_'+(appIndex+1)].updateInputList(outputList);
    }
  },
  addApp: function(){
    var appName=document.getElementById('newApp').value;
    this.setState(function(prevState){
      prevState.pipe.push(appName);
      var pathname=window.location.pathname;
      var bar='';
      if(pathname.match(/^\/pipe$/)){
        pathname=pathname+'/';
      }
      else{
        bar='|';
      }
      window.history.pushState("Hello", "Title", pathname+bar+appName);
      return prevState;
    });
  },
  addInput: function(item){
    var inputList=this.state.inputList;
    var index=inputList.length;
    inputList.push(item);
    this.setState({inputList:inputList},function(){
      if(this.refs['app_0']){
        this.refs['app_0'].updateInputList(this.state.inputList);
      }
    });
  },
  removeItem: function(index){
    this.state.inputList.splice(index,1);
    this.setState({inputList:this.state.inputList},function(){
      if(this.refs['app_0']){
        this.refs['app_0'].updateInputList(this.state.inputList);
      }
    });
  },
  updateInput: function(index,type,value){
    var obj={};
    obj[index]={};
    obj[index][type]={$set:value};
    var inputList=update(this.state.inputList,obj);
    this.setState({inputList:inputList},function(){
      if(this.refs['app_0']){
        this.refs['app_0'].updateInputList(this.state.inputList);
      }
    });
  },
  initApp: function(index,appName,callback){
    var refId='app_'+index;
    var refIdPrev='app_'+(index-1);
    if(!window[appName]){
      var script = document.createElement('script');
      script.src = '/apps/'+appName+'.js',
      script.onload = function(){
        var app=window[appName];
        this.setState(function(prevState){
          prevState.appInfos[appName]=app.info;
          return prevState;
        },function(){
          callback(function(){
            this.refs['app_0'].updateInputList(this.state.inputList);
          }.bind(this));
        });
      }.bind(this);
      document.head.appendChild(script);
    }
    else{
      var app=window[appName];
      this.setState(function(prevState){
        prevState.appInfos[appName]=app.info;
        return prevState;
      },function(){
        callback(function(){
          this.refs['app_0'].updateInputList(this.state.inputList);
        }.bind(this));
      });
    }
  },
  sideNav: function(){
    return (
      <div id="sideNav">
      </div>
    );
  },
  render: function(){
    var apps=this.state.pipe.map(function(appName,index){
      return (
        <App
          ref={'app_'+(index)}
          name={appName}
          id={appName+'_'+index}
          init={this.initApp.bind(this,index,appName)}
          params={this.state.paramList[index]}
          key={index}
          sendOutputList={this.handleOutputList.bind(null,index)}
          appInfo={this.state.appInfos[appName]}/>
      );
    },this);
    return(
      <div>
        <Helmet
          title="Pipe - WAPipe"
        />
        {this.sideNav()}
        <div>
          <IOBoard addItem={this.addInput} removeItem={this.removeItem} updateItem={this.updateInput} isIn={true} id="pipe-in" items={this.state.inputList} />
          {apps}
          New App: <input id="newApp" />
          <button onClick={this.addApp}>Add</button>
        </div>
      </div>
    );
  }
});
