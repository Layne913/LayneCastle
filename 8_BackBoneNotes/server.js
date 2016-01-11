var express = require('express');
var app = express();
var Notes = require('./Notes');
var url = require('url');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(express.static(__dirname + '/public'));

var noteList = [{name:'swimming', _id: 0}, {name:'running', _id: 1}];
var notes = new Notes(noteList);


app.get('/notes', function(req, res) {
	console.log('getNotes');
	var result = notes.getNotes();
	res.send(result);
}); 

// app.get('/notesSearch/', function(req, res) {
// 	var searchContent = req.query.id;
// 	notes.searchNote(searchContent, function(notes) {
// 		res.send({success: true, note: notes});
// 		//res.status(404, '');
// 	});
// });

app.post('/notes', function(req, res) {
	var newNote = req.body;
	console.log('postNote:'+ newNote.name);
	if(!newNote && newNote.name.trim != '') {
		res.send({success: false, reason: 'cannot create the note'});
		return;
	}
	notes.addNote(newNote.name, function(note) {
		res.send(note);
	});
});

app.delete('/notes/:id', function(req,res) {
	console.log('Delete id:'+ req.params.id);
	//Exception Handle
	var noteID = Number(req.params.id);
	notes.removeNoteById(noteID);
	res.send({_id: noteID});
});
app.listen(port);