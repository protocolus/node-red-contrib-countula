module.exports = function(RED) {
 function CountulaNode(config) {
   RED.nodes.createNode(this,config);
   var node = this;
   var nodeContext = this.context();
   var count=nodeContext.get('count') || 0;

     node.on('input', function(msg) {
	if (msg.topic === "SET") {
		// check that msg.count is int
    		nodeContext.set('count', msg.count);
		count = msg.count;
		msg = null;
    	        node.status({fill:"yellow",shape:"dot",text:count});
		this.send([ null , null ]);
	} else if (msg.topic === "RESET") {
    		nodeContext.set('count',0);
		count = 0;
                msg = null;
    	        node.status({fill:"red",shape:"dot",text:count});
		this.send([ null , null ]);
	} else {
    		count +=1;
         	//var msgCount = { payload: count };
		var newMsg = { payload: count };
    	        node.status({fill:"green",shape:"dot",text:count});
    		nodeContext.set('count',count);
		msg.count = count;
		this.send([ msg , newMsg ]);
	}
       });
  }
  RED.nodes.registerType("countula",CountulaNode);
}
