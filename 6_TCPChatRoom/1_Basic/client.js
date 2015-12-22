var net = require('net');
var colors = require('colors');
var client = new net.Socket();
client.setEncoding('utf-8');
process.stdin.setEncoding('utf-8');

client.connect(8080, function() {
	//pass the data in the process.stdin to the client
	//any input acton int tehr terminal will trigger this fucntion
	process.stdin.pipe(client);
	console.log('Client connecting to the server');

});


client.on('data', function(data) {
	console.log('Message Recieved from server:' + data.rainbow);
});


// client.on('readable', function() {
// 	var msg = client.read();
// 	console.log('Message Recieved from server:'+msg);
// });

// process.stdin.on('readable', function() {
// 	var input = process.stdin.read();
// 	if (input) {
// 		client.write(input);		
// 	}
// });




