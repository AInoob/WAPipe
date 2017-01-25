base64={
  info:{
    version: '0.0.1',
    description: 'Simple  Base64 encoding and decoding',
	owner: 'AInoob',
	link: 'https://ainoob.com',
	liscense: 'MIT',
    size: {
      width: '400px',
      height: '300px'
    },
    input: [
      'string'
    ],
    output: [
      'string'
    ],
    onTheFly: true,
    actions:{
      'encode it':'encode',
      'decode it':'decode'
    },
    defaultAction: 'encode'
  },
  core:function(){
	var core={
		encode: function(type,input,wapipe){
			try{
				if(type=='file'){
					wapipe.sendError('Not supported yet');
				}
				else{
					wapipe.sendOutput({type:'text/plain',value:btoa(input)});
				}
			}catch(e){
				wapipe.sendError(e);
			}
		},
		decode: function(type,input,wapipe){
			try{
				if(type=='file'){
					wapipe.sendError('Not supported yet');
				}
				else{
					wapipe.sendOutput({type:'text/plain',value:atob(input)});
				}
			}catch(e){
				wapipe.sendError(e);
			}
		}
	};
    return core;
  }
}
