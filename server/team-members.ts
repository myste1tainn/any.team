import {Meteor} from 'meteor/meteor';
import {TeamMembers} from '../collections/team-members';

Meteor.publish('teamMembers', function() {
	return TeamMembers.find();
})

TeamMembers.allow({
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