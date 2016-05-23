import {Meteor} from 'meteor/meteor';
import {Teams} from '../collections/teams';

Meteor.publish('teams', function() {
	return Teams.find();
})

Teams.allow({
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