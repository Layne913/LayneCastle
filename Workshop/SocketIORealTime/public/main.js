'use strict'

var sock = io();

 var canvas = document.querySelector('canvas');
 var ctx = canvas.getContext('2d');

function onMessage(msg) {
	var li = document.createElement('li');
	li.innerHTML = msg;
	var ul = document.getElementById('chat');
	ul.appendChild(li);
}
function sendMessage(msg){
	//client emit the message to all(only server) who connect to it 
	sock.emit('chat', msg);
}
function init(){

	var form = document.getElementById('say');
	form.addEventListener('submit', function(e){
		var inputMessage = document.querySelector('#say-field');
		sendMessage(inputMessage.value);
		inputMessage.value = '';
		e.preventDefault();
	})
	sock.on('chat', onMessage);
	sock.on('circle', drawCircle);

}

//random color 
//new client connect to the sever, recieve all historical data
canvas.addEventListener('mousedown', function(e) {
	sock.emit('circle', ({x: e.layerX, y: e.layerY}));
})

function drawCircle(coor, color) {
	console.log('drawCircle');
	ctx.fillStyle = color||'black';
	ctx.beginPath();
	ctx.arc(coor.x, coor.y, 15, 0, Math.PI*2, true);
	ctx.stroke();
	ctx.fill();

}

init();
