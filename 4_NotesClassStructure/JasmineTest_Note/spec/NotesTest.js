function Notes(notes) {
   this.notes = notes;
}

Notes.prototype.addNote = function(note) {
	this.notes.push(note);
}

Notes.prototype.removeNote = function(note) {
	var index = this.notes.indexOf(note);
	this.notes.splice(index, 1);
}

Notes.prototype.searchNote = function(note) {
	var pattern = new RegExp(note);
	return result = this.notes.filter(function(element) {
		return pattern.test(element);
	});
}

Notes.prototype.getNotes = function() {
	return this.notes;
}

module.exports = Notes;
