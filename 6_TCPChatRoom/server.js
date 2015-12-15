var net = require('net');
var tcpServer = net.createServer();
var clients=[];
tcpServer.on('connection', function(client) {
	client.setEncoding('utf-8');
	console.log('connected to the server');
	if (clients.indexOf(client) === -1) {
			console.log('currentClient:'+clients.toString);
			clients.push(client);
			clients.forEach(function(element){
				element.write('A new client is coming');
				element.pipe(element);
		});
	}

	client.on('readable', function() {
		var msg = client.read();
		console.log('Client Message:' + msg);
		//console.log('client message:' + msg);
		clients.forEach(function(element){
			element.write(msg);
			client.pipe(client);
		});

		console.log('client data ' + msg);

	});


	

	
	// socket.end('end', function(){
	// 	console.log('client disconnected');
	// })

	
});

tcpServer.listen(8080, function() {
	console.log('listen to the port 8080');
})