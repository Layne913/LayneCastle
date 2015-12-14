'use strict'
var sock = io();
function onMessage(msg){
	var li = document.createElement('li');
	li.innerHTML = msg;
	var ul = document.getElementById('chat');
	ul.appendChild(li);
}


function sendMessage(msg){
	sock.emit('chat',msg);
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

}

init();