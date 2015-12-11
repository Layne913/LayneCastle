function Notes(notes) {
   this.notes = notes;
}

Notes.prototype.addNote = function(note, callback) {
	this.notes.push(note);
	callback(note);
}

Notes.prototype.removeNote = function(note) {
	var index = this.notes.indexOf(note);
	this.notes.splice(index, 1);
}

Notes.prototype.searchNote = function(note, callback) {
	var pattern = new RegExp(note);
	var result = this.notes.filter(function(element) {
		return pattern.test(element);
	});
	callback(result);
}

var HTML_Text = {notes: document.getElementById('notes'),
				  noteInput: document.getElementById('noteInput'),
				  searchContent: document.getElementById('search')};

var notesObj = new Notes(['swimming', 'running']);

function add() {
	var noteName = HTML_Text.noteInput.value;
	if (noteName) {
		notesObj.addNote(noteName, createNote);
		HTML_Text.noteInput.value= '';	
	}
}

function search() {
	var searchContent = HTML_Text.searchContent.value;
	notesObj.searchNote(searchContent, displayNotes);
}

function createNote(noteName) {	
	var par = document.createElement('li');
	var removeBtn = document.createElement('button');	
	var text = document.createTextNode(' ' + noteName);
	removeBtn.innerHTML = 'REMOVE';
	removeBtn.onclick = function() {
		par.parentNode.removeChild(par);
		notesObj.removeNote(noteName);
		};

	par.appendChild(removeBtn);
	par.appendChild(text);
	HTML_Text.notes.appendChild(par);
}

function displayNotes(notesPresented) {
	HTML_Text.notes.innerHTML = '';
	notesPresented.forEach(createNote);
}

displayNotes(notesObj.notes);