import React from 'react';
import {Link} from 'react-router';
import IOBoard from './IOBoard.jsx';
import update from 'react-addons-update';

module.exports = React.createClass({
  getInitialState: function(){
    return {onRun:false,initDone:false,action:'loading',inputList:[],outputList:[],error:"",onTheFly:false};
  },
  componentDidMount: function(){
    this.props.init(function(callback){
      this.init(callback);
    }.bind(this));
  },
  init: function(callback){
    var info=this.props.appInfo;
    var params=this.props.params||{};
    var action=params.action||info.defaultAction;
    var onTheFly=params.onTheFly||info.onTheFly;
    var app=window[this.props.name];
    var core=app.core;
    var newCore=$.extend(true,{
      instance:core()
    },core());
    this.setState({action:action,onTheFly:onTheFly,core:newCore},function(){
      this.setState({initDone:true},function(){
        if(callback){
          callback();
        }
      });
    }.bind(this));
  },
  getMessage: function(index,message){
    console.log('message: '+message);
    this.setState({message:message});
  },
  getOutput: function(index,output){
    this.setState(function(prevState){
      prevState.outputList[index]=output;
      this.props.sendOutputList(prevState.outputList);
      return prevState;
    });
  },
  getError: function(index,error){
    console.log('error: '+error);
    this.setState({error:error});
  },
  updateAction:function(e){
    this.setState({action:e.target.value},function(){
      if(this.state.onTheFly){
        for(var i=0;i<this.state.inputList.length;i++){
          this.run(i);
        }
      }
    });
  },
  removeItem: function(index){
    this.setState(function(prevState){
      prevState.inputList.splice(index,1);
      return prevState;
    });
  },
  updateInput: function(index,type,value){
    //console.log('index: '+index+' type: '+type+' value: '+value);
    var obj={};
    obj[index]={};
    obj[index][type]={$set:value};
    var inputList=update(this.state.inputList,obj);
    this.setState({inputList:inputList},function(){
      if(this.state.onTheFly){
        this.run(index);
      }
    });
  },
  updateOutput: function(index,type,value){
    //console.log('index: '+index+' type: '+type+' value: '+value);
    var obj={};
    obj[index]={};
    obj[index][type]={$set:value};
    var outputList=update(this.state.outputList,obj);
    this.setState({outputList:outputList});
  },
  itemMatch: function(itemA,itemB){
    if(!itemA||!itemB)
      return false;
    return itemA.type==itemB.type&&itemA.value==itemB.value;
  },
  updateInputList: function(inputList){
    if(this.state.initDone){
      var sameInput;
      var newOutputList=[];
      var newInputList=[];
      var runList=[];
      var prevInputList=this.state.inputList;
      for(var i=0;i<inputList.length;i++){
        newInputList.push(inputList[i]);
      }
      if(this.state.onTheFly||this.state.onRun){
        for(var i=0;i<inputList.length;i++){
          sameInput=false;
          for(var j=0;j<prevInputList.length;j++){
            if(this.itemMatch(inputList[i],prevInputList[j])){
              newOutputList[i]=this.state.outputList[j];
              sameInput=true;
              break;
            }
          }
          if(!sameInput){
            runList.push(i);
          }
        }
      }
      this.setState({onRun:false,inputList:newInputList,outputList:newOutputList},function(){
        for(var i=0;i<runList.length;i++){
          this.run(runList[i]);
        }
        this.props.sendOutputList(this.state.outputList);
      });
    }
    else{
      setTimeout(this.updateInputList.bind(this,inputList),300);
    }
  },
  handleOnTheFlyChange: function(e){
    this.setState({onTheFly:e.target.checked});
    if(e.target.checked){
      this.updateInputList(this.state.inputList);
    }
  },
  handleRun: function(e){
    this.setState({onRun:true},function(){
      this.updateInputList(this.state.inputList);
    });
  },
  addItem: function(item){
    var inputList=this.state.inputList;
    var index=inputList.length;
    inputList.push(item);
    this.setState({inputList:inputList},function(){
      if(this.state.onTheFly){
        this.run(index);
      }
    });
  },
  display: function(){
    var outputList=this.state.outputList;
    return(
      <div className="app-display">
        <IOBoard addItem={this.addItem} removeItem={this.removeItem} updateItem={this.updateInput} isIn={true} id={this.props.id} items={this.state.inputList} />
        <IOBoard updateItem={this.updateOutput} removeItem={this.removeItem} isIn={false} items={this.state.outputList} />
        <div className="app-error">
        </div>
      </div>
    );
  },
  runAll: function(){
    for(var i=0;i<this.state.inputList.length;i++){
      this.run(i);
    }
  },
  run: function(i){
    var core=this.state.core;
    var itemNum=this.state.inputList.length;
    var item=this.state.inputList[i];
    var oldItem;
    if(!item)
      return;
    if(item.type=='file'){
      for(var j=0;j<i;j++){
        oldItem=this.state.inputList[j];
        if(oldItem.type=='file'&&item.value.name==oldItem.value.name&&item.value.lastModified==oldItem.value.lastModified){
          this.setState(function(prevState){
            prevState.outputList[i]=prevState.outputList[j];
            this.props.sendOutputList(prevState.outputList);
            return prevState;
          });
          return;
        }
      }
    }
    core[this.state.action](item.type,item.value,
      {
        sendOutput:this.getOutput.bind(this,i),
        sendMessage:this.getMessage.bind(this,i),
        sendError:this.getError.bind(this,i)
      });
  },
  displayInfo: function(){
    var info={};
    var creditDiv;
    var credits;
    if(this.props.appInfo){
      info=this.props.appInfo;
      credits=(this.props.appInfo.credits||[]).map(function(elem,index){
        return (
          <div className="app-info-credit-elem" key={index}>
            <span className="f-left">Author:</span>
            <span className="f-right">{elem.author}</span>
            <br />
            <span className="f-left">Website:</span>
            <span className="f-right"><a href={elem.link}>{elem.link}</a></span>
            <br />
            <span className="f-left">Liscense:</span>
            <span className="f-right">{elem.liscense}</span>
            <br />
          </div>);
      });
      if(this.props.appInfo.credits){
        creditDiv=
          <div className="app-info-credit">
            <div className="app-info-credit-header">Credits:</div>
            {credits}
         </div>
      }
    }
    return (
    <div className="app-info">
      <div className="app-info-brief">
        <span className="f-left">Author:</span>
        <span className="f-right">{info.author}</span>
        <br />
        <span className="f-left">Link:</span>
        <span className="f-right"><a href={info.link}>{info.link}</a></span>
        <br />
        <span className="f-left">Liscense:</span>
        <span className="f-right">{info.liscense}</span>
        <br />
      </div>
      {creditDiv}
    </div>);
  },
  render: function(){
    var options;
    if(this.props&&this.props.appInfo){
      var info=this.props.appInfo;
      var keys=Object.keys(info.actions);
      options=keys.map(function(elem,index){
        return (<option key={index} value={info.actions[elem]}>{elem}</option>);
      });
    }
    return(
      <div className="app" id={this.props.id}>
        <input type="checkbox" id={this.props.id+'_info_switch'} className="app-info-switch" />
        <div className="app-main">
          <div className="app-dashboard">
            <h3 className="app-title">{this.props.name}</h3>
            <label htmlFor={this.props.id+'_info_switch'} className="app-info-icon icon-info"></label>
            <table>
              <thead>
                <tr>
                  <th>Action</th>
                  <th><input type="checkbox" onChange={this.handleOnTheFlyChange} className="app-onTheFly" checked={this.state.onTheFly} />Autorun</th>
                </tr>
              </thead>
              <tbody>
              <tr>
                <td><select onChange={this.updateAction} value={this.state.action}>{options}</select></td>
                <td><button className="app-run" onClick={this.runAll}>Run</button></td>
              </tr>
              </tbody>
            </table>
          </div>
          {this.display()}
          <div className="app-message"></div>
          <div className="app-outputList"></div>
        </div>
        {this.displayInfo()}
      </div>
    );
  }
});
