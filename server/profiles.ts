import {Meteor} from 'meteor/meteor';
import {TeamMembers} from '../collections/team-members';

function buildQuery(teamId?: string) {
	var query = {};

	if (teamId) {
		// If team ID is provided, pull only users that is in th team
		var members = TeamMembers.find({ teamId: teamId });
		var userIds = members.map(function(p) { return p.userId })
		query = { _id: { $in: userIds } }
	}

	return query
}

Meteor.publish('users', function(teamId?: string) {
	return Meteor.users.find(buildQuery.call(this, teamId));
})

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