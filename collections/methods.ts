import {Meteor}		 	from 'meteor/meteor';
import {Email} 			from 'meteor/email';
import {check} 			from 'meteor/check';
import {Teams} 			from './teams';

function getContactEmail(user: Meteor.User) : string {
	console.log(user);
	if (user.emails && user.emails.length) {
		return user.emails[0].address;
	}

	return null;
}

Meteor.methods({
	invite: function (teamId: string, userId: string) {
		check(teamId, String);
		check(userId, String);

		var from: string, to: string;
		let team = Teams.findOne(teamId);

		if (!team) {
			throw new Meteor.Error('404', 'Team not found!');
		}

		if (team.owner !== this.userId) {
			throw new Meteor.Error('403', 'Permission denied');
		}

		console.log(this.userId, team.owner, userId);
		console.log('userId !== team.owner', userId !== team.owner);
		console.log('(team.invited || []).indexOf(userId)', (team.invited || []).indexOf(userId));
		console.log('userId !== team.owner && (team.invited || []).indexOf(userId) == -1', userId !== team.owner && (team.invited || []).indexOf(userId) == -1);

		// if (userId !== team.owner && (team.invited || []).indexOf(userId) == -1) {
			Teams.update(teamId, {$addToSet: {invited: userId}});

			from = getContactEmail(Meteor.users.findOne({_id: this.userId}));
			to = getContactEmail(Meteor.users.findOne({_id: userId}));
		// }

		if (Meteor.isServer && to) {
			let user = Meteor.user();
			var name = user.profile.name || from;

			console.log(Email.send({
							from: 'noreply@team.com',
							to: to,
							replyTo: from || undefined,
							subject: 'Join our team! ' + team.name,
							text: `You have been invited to join ${name}'s team.\n"Hey, come and join our Team! Collaborate more, do more on Any.Team"\nCome check it out: ${Meteor.absoluteUrl()}`
						}));
		}
	}
})