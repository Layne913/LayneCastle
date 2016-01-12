	function Notes(notes) {
   		this.notes = notes;
   		this.notesCount = notes.length-1;
	}

	Notes.prototype.addNote = function(noteName, callback) {
		this.notesCount ++;
		this.notes.push({name: noteName, _id: this.notesCount});
		callback({name: noteName, _id: this.notesCount});	
	}

	Notes.prototype.removeNote = function(note) {
		var index = this.notes.indexOf(note);
		this.notes.splice(index, 1);		
	}

	
	Notes.prototype.removeNoteById = function(noteId) {
		var remove_Note = this.notes.filter(function filterByID(note) {
			return note._id === noteId; 
		});		 
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

module.exports = Notes;




