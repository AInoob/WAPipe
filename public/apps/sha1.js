sha1={
  info:{
	author: 'AInoob',
    version: '0.0.1',
    description: 'Simple SHA-1 generator',
	liscense: 'MIT',
	credits: [
		{
			author: 'linkgod',
			copyright: 'Copyright (c) 2013 linkgod',
			link: 'https://github.com/linkgod/SHA-1',
			liscense: 'MIT',
			contribution: 'basic SHA-1 generating algorithm'
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
	(function(){function n(n){var t,e=(n.length+8>>6)+1,r=[];for(t=0;16*e>t;t++)r[t]=0;for(t=0;t<n.length;t++)r[t>>2]|=n.charCodeAt(t)<<24-8*(3&t);return r[t>>2]|=128<<24-8*(3&t),r[16*e-1]=8*n.length,r}function t(n){var t,e="0123456789abcdef",r="";for(t=0;t<4*n.length;t++)r+=e.charAt(n[t>>2]>>8*(3-t%4)+4&15)+e.charAt(n[t>>2]>>8*(3-t%4)&15);return r}function e(n){var t,e,i,c,d,a,h,l,s=[],p=1732584193,x=4023233417,g=2562383102,v=271733878,m=3285377520;for(h=0;h<n.length;h+=16){for(t=p,e=x,i=g,c=v,d=m,l=0;80>l;l++)16>l?s[l]=n[h+l]:s[l]=u(s[l-3]^s[l-8]^s[l-14]^s[l-16],1),a=f(f(u(p,5),r(l,x,g,v)),f(f(m,s[l]),o(l))),m=v,v=g,g=u(x,30),x=p,p=a;p=f(p,t),x=f(x,e),g=f(g,i),v=f(v,c),m=f(m,d)}return[p,x,g,v,m]}function r(n,t,e,r){return 20>n?t&e|~t&r:40>n?t^e^r:60>n?t&e|t&r|e&r:t^e^r}function o(n){return 20>n?1518500249:40>n?1859775393:60>n?2400959708:3395469782}function f(n,t){var e=(65535&n)+(65535&t),r=(n>>16)+(t>>16)+(e>>16);return r<<16|65535&e}function u(n,t){return n<<t|n>>>32-t}function i(r){return t(e(n(r)))}var c=this;"function"==typeof define&&define.amd?define(function(){return i}):"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=i),exports.sha1=i):c.sha1=i}).call(core);
	
    core.generate= function(type,input,wapipe){
		try{
			if(type=='file'){
				wapipe.sendError('Not supported yet');
			}
			else{
				wapipe.sendOutput({type:'text/plain',value:this.sha1(input)});
			}
		}catch(e){
			wapipe.sendError(e);
		}
	}
	return core;
  }
}
