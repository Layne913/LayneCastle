//Backbone Model

var Note = Backbone.Model.extend({
	idAttribute: "_id",
	defaults: {
		name: ''
	}
});

var Notes = Backbone.Collection.extend({
	model: Note,
	url:'http://localhost:8080/notes'
});

var NoteView = Backbone.View.extend({
	tagName: 'li',  
	template: _.template($('.notes-list-template').html()),
	initialize: function() {
	},
	events: {
		'click #remove-button': 'onRemoveSelectedNote'
	},
	onRemoveSelectedNote: function() {
		console.log('delete note id:' + this.model.id); 
		notesView.collection.url = '/notes';

		this.model.destroy({
			success: function(note) {
				//note == object in response? backbone Model (note.id?)?
				//if the object in response haven't define name attribute
				console.log('Successfully delete the note with name:' + note.toJSON().name);
				console.log('Successfully delete the note with id:' + note.id);
				console.log('Successfully delete the note with id:' + note.toJSON()._id);
			},
			error: function() {
				console.log('Failed to delete the note!');
			}
		});
	},
	render: function() {
		this.$el.html(this.template(this.model.attributes));
	}
});

var NotesView = Backbone.View.extend({
	el: $('.notes-list'),
	initialize: function() {
		this.listenTo(this.collection, 'add', this.render);
		this.listenTo(this.collection, 'remove', this.render);
		initializeDefaultNotes(this);
	 },
	render: function() {
		this.$el.empty();
		this.collection.each(function(note) {
			var noteView = new NoteView({
				model: note
			});
			noteView.render();
			this.$el.append(noteView.el);
		}, this);
	}
});

var appView = Backbone.View.extend({
	el: $('.app'),
	initialize: function() {
		notesView = new NotesView({
			collection: new Notes() 
		});
	},
	events: {
		'click #add-button': 'onAddNote',
		'keyup #search-input': 'onSearchNote'
	},
	onAddNote: function() {
		notesView.collection.url = '/notes';
		var note = new Note({
			name: $('#note-input').val()
		});		
		notesView.collection.add(note);
		console.log('Post note name:' + note.toJSON().name);
		note.save(null, {
							success: function(note) {
									console.log('Successfully saved note with name:' + note.toJSON().name);
						},
							error: function() {
									console.log('Failed to save the note');
						}
		});
		$('#note-input').val('');
	},

	onSearchNote: function(){
		var searchContent = $('#search-input').val();
		console.log(searchContent);
		notesView.collection.url = '/notesSearch?search=' + searchContent; 
		notesView.collection.fetch( {
			success: function(collection) {						collection.each(function(note) {
						console.log('Matched Note:' + note.id);
					})
			},
			error: function() {
					console.log('Failed to display matched notes');				} 
			});
	}
});

function initializeDefaultNotes(notesView){
	notesView.collection.fetch( {
		success: function(collection) {	
 					collection.each(function(note) {
 						console.log('Successfully got the note with Id:'+ note.toJSON()._id);
 					})
		},	
		error: function() {
			console.log('Failed to get the notes!');
		}
	});
}

var appView = new appView();


