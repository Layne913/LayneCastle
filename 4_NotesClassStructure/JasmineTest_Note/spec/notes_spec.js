var Notes = require('./NotesTest.js');
describe('Note', function() {
	var notes;

	beforeEach( function() {
		var notesExample = ['swimming', 'running', 'hiking', 'camping', 'jogging'];
		notesObj = new Notes([]);
		notesObj1 = new Notes(notesExample);
		notesObj2 = new Notes(notesExample);

	});

	it('should return the empty array', function() {
		var expectResult = [];
		expect(notesObj.getNotes()).toEqual(expectResult);
	});

	it('should return the array with the added notes', function() {
		notesObj.addNote('swimming');
		var expectResult = ['swimming'];
		expect(notesObj.getNotes()).toEqual(expectResult);
	});

	it('should return the array without the removed notes', function() {
		var expectResult = ['swimming', 'running', 'hiking', 'camping'];
		notesObj1.removeNote('jogging');
		expect(notesObj1.getNotes()).toEqual(expectResult);
	});

	it('should return the array with one the notes which matches the requirement', function() {
		var expectResult = ['swimming'];
		expect(notesObj2.searchNote('sw')).toEqual(expectResult);
	});

	it('should return empty array', function() {
		var expectResult = [];
		expect(notesObj2.searchNote('rds')).toEqual(expectResult);
	});

});