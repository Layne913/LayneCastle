'use strict';

let http = require('http');
let express = require('express');
let app = express();//express application
//start the sever to listen to 
let server = http.createServer(app);
let socketio = require('socket.io');
let io = socketio(server);
let record = [];

//sock.on('chat', ()=>{})
//When the server recieves the 'chat', it invoke the callback function

//here in (sock), sock is a specific client
//io stands everybody 

//server receive client 'sock'
io.on('connection', (sock) =>{
	for(var i = 0; i < record.length; i ++){
		io.emit('circle',record[i].cood, record[i].color);
	}
  	
	//client sock give 'chat', msg
	sock.on('chat', (msg) =>{
		//server emit the message to all (clients)  who connected to the server  
		io.emit('chat', msg);
	})


	sock.on('circle', (cood) =>{
		var color= getRandomColor();
		record.push({cood: cood, color: color})
		io.emit('circle', cood, color);
	})
})

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color + = letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
//when it recieves the 'hello', it runs the function(req,res),
//with the response of Hello world
//what ever in the public folder is available for web
app.get('/hello', (req,res)=> {
	res.send('Hello world');
})

//want to use the middleware For files
//_dirname the path for the file
//what ever in the public folder is available for web

app.use(express.static(__dirname + '/public'));

server.listen(8080, () =>{
	console.log('Listening to 8080');
});