import {Mongo} from 'meteor/mongo';

export let Parties = new Mongo.Collection<Party>('parties');

Parties.allow({
	insert: function() {
		let user = Meteor.user();

		return !!user;
	},
	update: function() {
		let user = Meteor.user();

		return !!user;
	},
	remove : function() {
		let user = Meteor.user();

		return !!user;
	}
})