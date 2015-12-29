var Notes = require('./Notes.js');
var app = require('express')();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var example = ['swimming', 'running'];
var notes = new Notes(example);
var port = process.env.PORT || 8080;
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send('Welcome to Notes!');
});

app.get('/notes', function(req, res) {
	var result = notes.getNotes();
	res.send(result);
}); 

app.post('/note', function(req, res) {
	var newNote = req.body.name;
	console.log(newNote);
	if(!newNote) {
		res.send({success: false, reason: 'cannot create the note'});
		return;
	}
	console.log(newNote);
	notes.addNote(newNote);
	res.send({success: true, note: newNote});
});

// app.delete('/:note', function(req,res) {
// 	var noteDelete = req.params.note;
// 	console.log(noteDelete);
// 	notes.removeNote(noteDelete);
// 	res.send({success: true, note:　'Note removed!'})
// });

app.listen(port);