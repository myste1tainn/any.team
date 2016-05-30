// Meteor
import {Meteor} from 'meteor/meteor';
import {TeamMembers} from '../collections/team-members';
import '../collections/methods.ts';

// server
Meteor.publish("users", function () {
	return Meteor.users.find();
});

function buildQuery(teamId?: string) {
	var query = {};

	if (teamId) {
		// If team ID is provided, pull only users that is in th team
		query = { teamId: teamId };
	}

	return query
}

Meteor.users.allow({
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
