var net = require('net');
var client = new net.Socket();
client.setEncoding('utf-8');
process.stdin.setEncoding('utf-8');

client.connect(8080, function(){
	console.log('Client connecting to the server');

});


// client.on('readable', function() {
// 	var msg = client.read();
// 	console.log('Message Recieved from server:'+msg);
// });

process.stdin.on('readable', function(){
	var input = process.stdin.read();
	if (input){
		console.log('input is ' + input);
		client.write(input);
		client.pipe(client);
		console.log('Completed');
		
	}
});


