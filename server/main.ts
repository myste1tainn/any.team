// Meteor
import {Meteor} from 'meteor/meteor';
import {TeamMembers} from '../collections/team-members';
import '../collections/methods.ts';

Meteor.publish('current-user', function () {
	return Meteor.users.find({_id: this.userId});
})

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
		let user = Meteor.user();
		return !!user;
	},
	update: function() {
		let user = Meteor.user();
		return !!user && user._id == this.userId;
	}
})
