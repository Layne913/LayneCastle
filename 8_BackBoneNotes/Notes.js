	function Notes(notes) {
   		this.notes = notes;
   		this.notesCount = notes.length-1;
	}

	Notes.prototype.addNote = function(noteName, callback) {
		this.notesCount ++;
		this.notes.push({name: noteName, _id: this.notesCount});
		callback({name:noteName, _id:this.notesCount});	

	}

	Notes.prototype.removeNote = function(note) {
		var index = this.notes.indexOf(note);
		this.notes.splice(index, 1);		
	}

	Notes.prototype.removeNoteById = function(noteId) {
		var remove_Note = this.notes.filter(function filterByID(note){ 
			return note._id === noteId; 
		});
		console.log('noteID in Notes ' + noteId);  
		console.log(remove_Note);
		this.removeNote(remove_Note[0]);	
	}
	
	Notes.prototype.searchNote = function(searchContent, callback) {
		var pattern = new RegExp(searchContent);
		var result = this.notes.filter(function(note) {
			return pattern.test(note.name);
		});
		callback(result);
	}

	Notes.prototype.getNotes = function() {
		return this.notes;
	}

	Notes.prototype.getNotesCount = function() {
		return this.notesCount;
	}

	function Note(name,id) {
		this.name = name;
		this._id = id;
	}

module.exports = Notes;





// var n1 = new Note('note1',1);
// var n2 = new Note('note2',2);
// var n3 = new Note('note3',3);
// var n4 = new Note('note4',4);
// var n5 = new Note('note5',5);
// var n6 = new Note('sdfsf',6);

//var notes = new Notes([{name:'n1',id:1},{name:'n2',id:2},{name:'n3',id:3},{name:'n4',id:4},{name:'n5',id:5}]);



//console.log(notes.searchNote('n'));

