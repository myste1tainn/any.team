// Meteor
import {Meteor} from 'meteor/meteor';
import {TeamMembers} from '../collections/team-members';

// server
Meteor.publish("users", function () {
	if (this.userId) {
		return Meteor.users.find({_id: this.userId}, {
			fields: { 'profile': 1, 'name': 1, 'createdAt': 1, 'services': 1 }
		});
	} else {
		this.ready();
	}
});

function buildQuery(teamId?: string) {
	var query = {};

	if (teamId) {
		// If team ID is provided, pull only users that is in th team
		query = { teamId: teamId };
	}

	return query
}

// Meteor.publish('users', function(teamId?: string) {
// 	return Meteor.users.find(buildQuery.call(this, teamId));
// })

// Meteor.users.allow({
// 	insert: function() {
// 		return true;
// 	},
// 	update: function() {
// 		return true;
// 	},
// 	remove: function() {
// 		return true;
// 	}
// })
