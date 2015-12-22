var net = require('net');
var colors = require('colors');
//var coolors = require('coolors');
var moment = require('moment');
var tcpServer = net.createServer();
var clients=[];

tcpServer.on('connection', function(client) {
	client.setEncoding('utf-8');
	var now = moment();

	if (clients.indexOf(client) === -1) {
		clients.push(client);
		client.write('Hello! Please enter your name :)');
	}

	// client.on('readable', function() {
	// 	var msg = client.read();
	// 	console.log('Server Recieved: ' + msg);
	// 	clients.forEach(function(element){
	// 		element.write(msg);
	// 	});
	// });

	client.on('data', function(data) {
		//var currentClient = getCurrentClient();
	   if (!client.name){
	   	 	client.name = data;
	   	 	client.color = 'grey';
	   	 	var msgJoin = client.name + ' joined the conversation!';
	   	 	msgJoin = msgJoin.replace(/(\r\n|\n|\r)/gm,"");
	   	 	clients.forEach(function(element) {
	   	 		if (element !== client){
	   	 			element.write(msgJoin) ;
	   	 		}
			});
			console.log(msgJoin);
	   	 	return;
	   }
	   	if(!checkCommand(data)){
			var timeStamp = now.format('HH:mm:ss');
			var msg = "[" + timeStamp + "] " + client.name + ":" + data;
			msg = msg.replace(/(\r\n|\n|\r)/gm,"");
			var coloredMessage = setColor(msg, client.color); 
			if(coloredMessage){
				clients.forEach(function(element){
					if (element !== client) {
	   					element.write(coloredMessage);
	   	 			}
				});
			}
		}
	});

	client.on('error', function() {
	});

	client.on('close', function() {
		removeClient(client);
		var timeStamp = now.format('HH:mm:ss');
		var msgClose = "[" + timeStamp + "] " + client.name + " left the chat.";
		msgClose = msgClose.replace(/(\r\n|\n|\r)/gm,"");
		clients.forEach(function(element){
			if (element!==client){
	   	 			element.write(msgClose);
	   	 		}
		});
	});

	function removeClient(client) {
		var index = clients.indexOf(client);
		clients.splice(index, 1);
	}

	function changeName(client, newName) {
		client.name = newName;
	}

	function changeColor(client, color) {
		client.color = color;
	}

	function checkCommand(data) {
		var cmd = data.substr(0, data.length-2);
		if (cmd.substr(0, 5) === ('/name')) {
			var name = data.substr(6);
			changeName(client, name);
			client.write('Your name has been changed to ' + name);
			return true;
		} else if (cmd === '/ping') {
			client.write('PANG');
			return true;
		} else if (cmd === '/list') {
			var names = 'Online clients are as follows:';
			clients.forEach(function(element) {
				names += element.name + "; " 
			});
	   	 	names = names.replace(/(\r\n|\n|\r)/gm,"");
			client.write(names);
			return true;
		} else if (cmd === '/quit') {
			client.end();
			return true;
		} else if (cmd.substr(0,6) === ('/color')){
			var newColor = cmd.substr(7);
			changeColor(client, newColor);
			return true;
		}
		return false;
	}	
});


function setColor(text, colorText) {
	if (colorText === 'black') {
		return text.black;
	} else if (colorText === 'red') {
		return text.red;
	} else if (colorText === 'grey') {
		return text.grey;
	} else if (colorText === 'yellow') {
		return text.yellow;
	} else if (colorText === 'green') {
		return text.green;
	} else if (colorText === 'blue') {
		return text.blue;
	} else if (colorText === 'magenta') {
		return text.magenta;
	} else if (colorText === 'cyan') {
		return text.cyan;
	} else if (colorText === 'white') {
		return text.white;
	}else if (colorText === 'gray') {
		return text.gray;
	}else {
		return false;
	}
}
tcpServer.listen(8080, function() {
	console.log('listen to the port 8080');
})