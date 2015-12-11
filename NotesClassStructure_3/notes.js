function NoteClass(MAP, HTMLFilds) {
		this.MAP = MAP;
		this.HTMLFilds = HTMLFilds;
};

NoteClass.prototype.addNote = function() {
	//??
	var str = document.getElementById('Note').value;
	if (str) {
		var noteElement = {content: str, par: null};
		noteElement.par = this.createNode(noteElement);
		this.MAP.push(noteElement);
    }
};

NoteClass.prototype.createNode = function(element) {
	//??
	var par = document.createElement('li');
	var notes = this.noteFilds.notes;
	var removeBtn = document.createElement('button');	
	var str = element.content;
	var text = document.createTextNode(' ' + str);
	removeBtn.innerHTML = 'REMOVE';
	removeBtn.onclick = function() {
		par.parentNode.removeChild(par);
		// this.MAP=this.MAP.filter()
		this.MAP = MAP.filter(function(obj) {
			return obj.content === str;
			})
	};

	par.appendChild(removeBtn);
	par.appendChild(text);
	notes.appendChild(par);
	//Dynamically assign value
	document.getElementById('Note').value = "";
	return par;
};

NoteClass.prototype.addPresetNote = function() {
	MAP.forEach(this.createNode);
	// ??get the return value of createNode 
};


NoteClass.prototype.matchNotes = function(key) {
	var searchContent = document.getElementById('search').value;
	var pattern = new RegExp(searchContent);
	return pattern.test(key);
};

NoteClass.prototype.showNotes = function(){
	var myMap = this.searchNote();
	this.displayNotes(myMap);
};

NoteClass.prototype.searchNote = function() {
	var self = this;
	return MAP.filter(function(obj) {
		return self.matchNotes(obj.content);
	})
};

NoteClass.prototype.displayNotes = function(myMap) {
	//????????
	this.HTMLFilds.notes.innerHTML = '';
	myMap.forEach(this.createNode);
};

var HTMLFilds = {notes: document.getElementById('notes'),
				  noteTextFild: document.getElementById('Note').value,
				  searchContent: document.getElementById('search').value};
var MAP = [{content: 'swimming', par: null},
		   {content: 'go shopping', par: null}];
var note = new NoteClass(MAP, HTMLFilds);

note.addPresetNote();

//in ES6 use export / require to get the class?