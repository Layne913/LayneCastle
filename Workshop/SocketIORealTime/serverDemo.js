'use strict';

let http = require('http');
let express = require('express');
let socketio = require('socket.io');//run on top of the server

let app = express();//express application
//start the sever to listen to 
let server = http.createServer(app);
//run on top of the server

//register server on io
let io = socketio(server);

//sock is the only means to talk to the client, emit ??/
// io.on('connection', (sock) =>{
// 	sock.on('chat', (msg)=>{
// 		console.log('server joined');
// 		io.omit('chat',msg)
// 	});
// 	console.log("somebody is connected ");
// });
io.on('connection', (sock) =>{
	console.log('A client is connected to the server');
})
//when it recieves the 'hello', it runs the function(req,res),
//with the response of Hello world
//what ever in the public folder is available for web
app.get('/hello', (req,res)=>{
	res.send('Hello world');
})

//want to use the middleware For files
//_dirname the path for the file
//what ever in the public folder is available for web
//this is the middleware and responsible for solving 
app.use(express.static(__dirname + '/public'));

server.listen(8080, () =>{
	console.log('Listening to 8080');
});