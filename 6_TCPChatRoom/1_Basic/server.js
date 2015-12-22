var net = require('net');
var colors = require('colors');
var tcpServer = net.createServer();
var clients=[];
tcpServer.on('connection', function(client) {
	client.setEncoding('utf-8');
	console.log('A new client connects to the server');

	if (clients.indexOf(client) === -1) {
		clients.forEach(function(element) {
			element.write('A new client is coming');
		});
		clients.push(client);
		client.write('Hello!');
	}

	// client.on('readable', function() {
	// 	var msg = client.read();
	// 	console.log('Server Recieved: ' + msg);
	// 	clients.forEach(function(element){
	// 		element.write(msg);
	// 	});
	// });

	client.on('data', function(data) {
		console.log('Server Recieved: ' + data);
		clients.forEach(function(element){
			element.write(data);
		});
	})

	client.on('error', function() {
		console.log('Client disconnected.'.red);
		removeClient(client);
	});

	function removeClient(client) {
		var index = clients.indexOf(client);
		clients.splice(index, 1);
	}
	
});

tcpServer.listen(8080, function() {
	console.log('listen to the port 8080');
})