//Backbone Model

var Note = Backbone.Model.extend({
	idAttribute: "_id",
	defaults: {
		name: ''
	}
});


//Backbone Collection
var Notes = Backbone.Collection.extend({
	model: Note,
	url:'http://localhost:8080/notes'
});

//var notes = new Notes();

//Backbone Views
var NoteView = Backbone.View.extend({
	tagName: 'li',  
	template: _.template($('.notes-list-template').html()),
	initialize: function() {
	},
	events: {
		'click #remove-button': 'onRemoveSelectedNote'
	},
	onRemoveSelectedNote: function() {
		//this.model: backbone Model
		console.log('delete note id:' + this.model.id); 
		//console.log('delete note id:' + this.model.toJSON()._id); 

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
		console.log(this);
		initializeDefaultNotes(this);
	 },
	render: function() {
		this.$el.empty();
		this.collection.each(function(note) {
			var noteView = new NoteView({model: note});
			noteView.render();
			this.$el.append(noteView.el);
		}, this);
	}
});

// var notes = new Notes();
// notes.url = "/notes?search="
// notes.fetch

var appView = Backbone.View.extend({
	el: $('.app'),
	initialize: function() {
		notesView = new NotesView({ collection: new Notes() });
	},
	events: {
		'click #add-button': 'onAddNote'
	},
	onAddNote: function() {
		var note = new Note({name: $('#note-input').val()});		
		notesView.collection.add(note);
		console.log('Post note name:' + note.toJSON().name);
		note.save(null, {success: function(note) {
					console.log('Successfully saved note with name:' + note.toJSON().name);
				},
				error: function() {
					console.log('Failed to save the note');
				}
		});

		// notes.create({name: $('#note-input').val()},{
		// 		success: function(note) {
		// 			console.log('Successfully saved note with name:' + note.name);
		// 		},
		// 		error: function(){
		// 			console.log('Failed to save the note');
		// 		}
		// });		
		$('#note-input').val('');
	}

});


function initializeDefaultNotes(notesView){
	notesView.collection.fetch( {
		success: function(collection) {	
 					collection.each(function(note) {
 						console.log('Successfully got the note with Id:'+ note._id);
 					})
		},	
		error: function() {
			console.log('Failed to get the notes!');
		}
	});
}


var appView = new appView();


