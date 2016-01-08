//Backbone Model

var Note = Backbone.Model.extend({
	defaults: {
		idAttribute: "_id",
		name: '',
		url:''
	}
});


//Backbone Collection
var Notes = Backbone.Collection.extend({
	model: Note,
	url:'http://localhost:8080/notes'
});

var notes = new Notes();
//Backbone Views
var NoteView = Backbone.View.extend({
	tagName: 'li',
	template: _.template($('script[name=notes-list-template]').html()),
	initialize: function() {
	},
	events: {
		'click button[name=remove-button]': 'delete'
	},
	delete: function() {
		console.log('delete Model:' + this.model.toJSON());
		console.log('delete Model Name:' + this.model.toJSON().name); 

		this.model.destroy({
			success: function(note) {
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
	el: $('ul[name=notes-list]'),
	initialize: function() {
		this.collection.on('add', this.render, this);
		this.collection.on('remove', this.render, this);
	 },
	render: function() {
		var self = this;
		this.$el.html('');
		_.each(this.collection.toArray(), function(note) {
			var noteView = new NoteView({model: note});
			noteView.render();
			self.$el.append(noteView.el);
		});
	}
});

// var notes = new Notes();
// notes.url = "/notes?search="
// notes.fetch

var notesView = new NotesView({ collection: notes });
notesView.collection.fetch( {
	success: function(collection)
		{	
 			_.each(collection.toJSON(),
 			function(note) {
				console.log('Successfully got the note with Id:'+ note._id);
			})
		},	
	error: function() {
		console.log('Failed to get the notes!');
	}
});

$(document).ready(function() {
	$('button[name=add-button]').on('click', function() {
		var note = new Note({name: $('input[name=note-input]').val()});		
		notes.add(note);
		console.log('Post note:' + note.toJSON());
		console.log('Post note name:' + note.toJSON().name);
		note.save(null, {success: function(note) {
					console.log('Successfully saved note with name:' + note.toJSON().name);
				},
				error: function() {
					console.log('Failed to save the note');
				}
		});

		// notes.create({name: $('input[name=note-input]').val()},{
		// 		success: function(note) {
		// 			console.log('Successfully saved note with name:' + note.name);
		// 		},
		// 		error: function(){
		// 			console.log('Failed to save the note');
		// 		}
		// });		
		$('input[name=note-input]').val('');
	});
})

