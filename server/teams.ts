import {Meteor} from 'meteor/meteor';
import {Profiles} from '../collections/profiles';

Meteor.publish('profiles', function() {
	return Profiles.find();
})

Profiles.allow({
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