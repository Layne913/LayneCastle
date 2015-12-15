var net = require('net');
var net = require('net');
var tcpServer = net.createServer();
tcpServer.on('connection', function(socket) {
	console.log(connected);
}
// var tcpServer = net.createServer(function(socket) {
// 	console.log('build the connection');
// 	socket.on('data', function(data) {
// 		console.log(data);
// 	} );
// });

// tcpServer.on('connection', function(socket) {
// 	console.log('build the connection');
// 	socket.on('data', function(data) {
// 		console.log(data);
// 	} );
// });

tcpServer.listen(8080, function(){
	console.log('listening to port 8080');
})