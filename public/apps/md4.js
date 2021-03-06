md4={
  info:{
	author: 'AInoob',
    version: '0.0.1',
    description: 'Simple MD4 generator',
	liscense: 'MIT',
	credits: [
		{
			author: 'Yi-Cyuan Chen',
			copyright: 'Copyright 2015 Yi-Cyuan Chen',
			link: 'https://github.com/emn178/js-md4',
			liscense: 'MIT',
			contribution: 'basic MD4 generating algorithm'
		}
	],
    input: [
      'string'
    ],
    output: [
      'string'
    ],
    onTheFly: true,
    actions:{
      'generate':'generate'
    },
    defaultAction: 'generate'
  },
  core:function(){
	var core={};
	!function(t){"use strict";function i(t){if(t)c[0]=c[16]=c[1]=c[2]=c[3]=c[4]=c[5]=c[6]=c[7]=c[8]=c[9]=c[10]=c[11]=c[12]=c[13]=c[14]=c[15]=0,this.blocks=c,this.buffer8=s;else if(n){var i=new ArrayBuffer(68);this.buffer8=new Uint8Array(i),this.blocks=new Uint32Array(i)}else this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];this.h0=this.h1=this.h2=this.h3=this.start=this.bytes=0,this.finalized=this.hashed=!1,this.first=!0}var h="object"==typeof process&&process.versions&&process.versions.node;h&&(t=global);var s,e=!t.JS_MD4_TEST&&"object"==typeof module&&module.exports,r="function"==typeof define&&define.amd,n=!t.JS_MD4_TEST&&"undefined"!=typeof ArrayBuffer,o="0123456789abcdef".split(""),a=[128,32768,8388608,-2147483648],f=[0,8,16,24],u=["hex","array","digest","buffer"],c=[];if(n){var p=new ArrayBuffer(68);s=new Uint8Array(p),c=new Uint32Array(p)}var d=function(t){return function(h){return new i(!0).update(h)[t]()}},y=function(){var t=d("hex");t.create=function(){return new i},t.update=function(i){return t.create().update(i)};for(var h=0;h<u.length;++h){var s=u[h];t[s]=d(s)}return t};i.prototype.update=function(i){if(!this.finalized){var h="string"!=typeof i;h&&i.constructor==t.ArrayBuffer&&(i=new Uint8Array(i));for(var s,e,r=0,o=i.length||0,a=this.blocks,u=this.buffer8;o>r;){if(this.hashed&&(this.hashed=!1,a[0]=a[16],a[16]=a[1]=a[2]=a[3]=a[4]=a[5]=a[6]=a[7]=a[8]=a[9]=a[10]=a[11]=a[12]=a[13]=a[14]=a[15]=0),h)if(n)for(e=this.start;o>r&&64>e;++r)u[e++]=i[r];else for(e=this.start;o>r&&64>e;++r)a[e>>2]|=i[r]<<f[3&e++];else if(n)for(e=this.start;o>r&&64>e;++r)s=i.charCodeAt(r),128>s?u[e++]=s:2048>s?(u[e++]=192|s>>6,u[e++]=128|63&s):55296>s||s>=57344?(u[e++]=224|s>>12,u[e++]=128|s>>6&63,u[e++]=128|63&s):(s=65536+((1023&s)<<10|1023&i.charCodeAt(++r)),u[e++]=240|s>>18,u[e++]=128|s>>12&63,u[e++]=128|s>>6&63,u[e++]=128|63&s);else for(e=this.start;o>r&&64>e;++r)s=i.charCodeAt(r),128>s?a[e>>2]|=s<<f[3&e++]:2048>s?(a[e>>2]|=(192|s>>6)<<f[3&e++],a[e>>2]|=(128|63&s)<<f[3&e++]):55296>s||s>=57344?(a[e>>2]|=(224|s>>12)<<f[3&e++],a[e>>2]|=(128|s>>6&63)<<f[3&e++],a[e>>2]|=(128|63&s)<<f[3&e++]):(s=65536+((1023&s)<<10|1023&i.charCodeAt(++r)),a[e>>2]|=(240|s>>18)<<f[3&e++],a[e>>2]|=(128|s>>12&63)<<f[3&e++],a[e>>2]|=(128|s>>6&63)<<f[3&e++],a[e>>2]|=(128|63&s)<<f[3&e++]);this.lastByteIndex=e,this.bytes+=e-this.start,e>=64?(this.start=e-64,this.hash(),this.hashed=!0):this.start=e}return this}},i.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,i=this.lastByteIndex;t[i>>2]|=a[3&i],i>=56&&(this.hashed||this.hash(),t[0]=t[16],t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.bytes<<3,this.hash()}},i.prototype.hash=function(){var t,i,h,s,e,r,n,o,a=this.blocks;this.first?(t=a[0]-1,t=t<<3|t>>>29,s=(4023233417&t|2562383102&~t)+a[1]+271733878,s=s<<7|s>>>25,h=(s&t|4023233417&~s)+a[2]-1732584194,h=h<<11|h>>>21,i=(h&s|~h&t)+a[3]-271733879,i=i<<19|i>>>13):(t=this.h0,i=this.h1,h=this.h2,s=this.h3,t+=(i&h|~i&s)+a[0],t=t<<3|t>>>29,s+=(t&i|~t&h)+a[1],s=s<<7|s>>>25,h+=(s&t|~s&i)+a[2],h=h<<11|h>>>21,i+=(h&s|~h&t)+a[3],i=i<<19|i>>>13),t+=(i&h|~i&s)+a[4],t=t<<3|t>>>29,s+=(t&i|~t&h)+a[5],s=s<<7|s>>>25,h+=(s&t|~s&i)+a[6],h=h<<11|h>>>21,i+=(h&s|~h&t)+a[7],i=i<<19|i>>>13,t+=(i&h|~i&s)+a[8],t=t<<3|t>>>29,s+=(t&i|~t&h)+a[9],s=s<<7|s>>>25,h+=(s&t|~s&i)+a[10],h=h<<11|h>>>21,i+=(h&s|~h&t)+a[11],i=i<<19|i>>>13,t+=(i&h|~i&s)+a[12],t=t<<3|t>>>29,s+=(t&i|~t&h)+a[13],s=s<<7|s>>>25,h+=(s&t|~s&i)+a[14],h=h<<11|h>>>21,i+=(h&s|~h&t)+a[15],i=i<<19|i>>>13,r=i&h,t+=(r|i&s|h&s)+a[0]+1518500249,t=t<<3|t>>>29,e=t&i,s+=(e|t&h|r)+a[4]+1518500249,s=s<<5|s>>>27,o=s&t,h+=(o|s&i|e)+a[8]+1518500249,h=h<<9|h>>>23,n=h&s,i+=(n|h&t|o)+a[12]+1518500249,i=i<<13|i>>>19,r=i&h,t+=(r|i&s|n)+a[1]+1518500249,t=t<<3|t>>>29,e=t&i,s+=(e|t&h|r)+a[5]+1518500249,s=s<<5|s>>>27,o=s&t,h+=(o|s&i|e)+a[9]+1518500249,h=h<<9|h>>>23,n=h&s,i+=(n|h&t|o)+a[13]+1518500249,i=i<<13|i>>>19,r=i&h,t+=(r|i&s|n)+a[2]+1518500249,t=t<<3|t>>>29,e=t&i,s+=(e|t&h|r)+a[6]+1518500249,s=s<<5|s>>>27,o=s&t,h+=(o|s&i|e)+a[10]+1518500249,h=h<<9|h>>>23,n=h&s,i+=(n|h&t|o)+a[14]+1518500249,i=i<<13|i>>>19,r=i&h,t+=(r|i&s|n)+a[3]+1518500249,t=t<<3|t>>>29,e=t&i,s+=(e|t&h|r)+a[7]+1518500249,s=s<<5|s>>>27,o=s&t,h+=(o|s&i|e)+a[11]+1518500249,h=h<<9|h>>>23,i+=(h&s|h&t|o)+a[15]+1518500249,i=i<<13|i>>>19,r=i^h,t+=(r^s)+a[0]+1859775393,t=t<<3|t>>>29,s+=(r^t)+a[8]+1859775393,s=s<<9|s>>>23,o=s^t,h+=(o^i)+a[4]+1859775393,h=h<<11|h>>>21,i+=(o^h)+a[12]+1859775393,i=i<<15|i>>>17,r=i^h,t+=(r^s)+a[2]+1859775393,t=t<<3|t>>>29,s+=(r^t)+a[10]+1859775393,s=s<<9|s>>>23,o=s^t,h+=(o^i)+a[6]+1859775393,h=h<<11|h>>>21,i+=(o^h)+a[14]+1859775393,i=i<<15|i>>>17,r=i^h,t+=(r^s)+a[1]+1859775393,t=t<<3|t>>>29,s+=(r^t)+a[9]+1859775393,s=s<<9|s>>>23,o=s^t,h+=(o^i)+a[5]+1859775393,h=h<<11|h>>>21,i+=(o^h)+a[13]+1859775393,i=i<<15|i>>>17,r=i^h,t+=(r^s)+a[3]+1859775393,t=t<<3|t>>>29,s+=(r^t)+a[11]+1859775393,s=s<<9|s>>>23,o=s^t,h+=(o^i)+a[7]+1859775393,h=h<<11|h>>>21,i+=(o^h)+a[15]+1859775393,i=i<<15|i>>>17,this.first?(this.h0=t+1732584193<<0,this.h1=i-271733879<<0,this.h2=h-1732584194<<0,this.h3=s+271733878<<0,this.first=!1):(this.h0=this.h0+t<<0,this.h1=this.h1+i<<0,this.h2=this.h2+h<<0,this.h3=this.h3+s<<0)},i.prototype.hex=function(){this.finalize();var t=this.h0,i=this.h1,h=this.h2,s=this.h3;return o[t>>4&15]+o[15&t]+o[t>>12&15]+o[t>>8&15]+o[t>>20&15]+o[t>>16&15]+o[t>>28&15]+o[t>>24&15]+o[i>>4&15]+o[15&i]+o[i>>12&15]+o[i>>8&15]+o[i>>20&15]+o[i>>16&15]+o[i>>28&15]+o[i>>24&15]+o[h>>4&15]+o[15&h]+o[h>>12&15]+o[h>>8&15]+o[h>>20&15]+o[h>>16&15]+o[h>>28&15]+o[h>>24&15]+o[s>>4&15]+o[15&s]+o[s>>12&15]+o[s>>8&15]+o[s>>20&15]+o[s>>16&15]+o[s>>28&15]+o[s>>24&15]},i.prototype.toString=i.prototype.hex,i.prototype.digest=function(){this.finalize();var t=this.h0,i=this.h1,h=this.h2,s=this.h3;return[255&t,t>>8&255,t>>16&255,t>>24&255,255&i,i>>8&255,i>>16&255,i>>24&255,255&h,h>>8&255,h>>16&255,h>>24&255,255&s,s>>8&255,s>>16&255,s>>24&255]},i.prototype.array=i.prototype.digest,i.prototype.buffer=function(){this.finalize();var t=new ArrayBuffer(16),i=new Uint32Array(t);return i[0]=this.h0,i[1]=this.h1,i[2]=this.h2,i[3]=this.h3,t};var l=y();e?module.exports=l:(t.md4=l,r&&define(function(){return l}))}(core)
	core.generate=function(type,input,wapipe){
		try{
			if(type=='file'){
				wapipe.sendError('not supported yet');
			}
			else{
				console.log(input);
				wapipe.sendOutput({type:'text/plain',value:this.md4(input)});
			}
		}catch(e){
			wapipe.sendError(e);
		}
	}
	return core;
  }
}
