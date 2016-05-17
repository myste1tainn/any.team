import {Meteor} from 'meteor/meteor';
import {Persons} from '../collections/persons';

Meteor.publish('persons', function() {
	return Persons.find();
})

Persons.allow({
	insert: function() {
		return true;
	},
	update: function() {
		return true;
	},
	remove: function() {
		return true;
	}
})