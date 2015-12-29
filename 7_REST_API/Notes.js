function Notes(notes) {
   this.notes = notes;
}

Notes.prototype.addNote = function(note, callback) {
	this.notes.push(note);
	if(callback){
		callback(note);	
	}
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

Notes.prototype.getNotes = function() {
	return this.notes;
}

module.exports = Notes;

