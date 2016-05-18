import {Meteor} from 'meteor/meteor';
import {Component} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';
import {RouterLink} from '@angular/router-deprecated';
import {Profiles} from '../../../collections/profiles';
import {LoginButtons, InjectUser} from 'angular2-meteor-accounts-ui';

@Component({
	selector: 'dashboard',
	templateUrl: 'client/imports/dashboard/dashboard.html',
	directives: [LoginButtons, RouterLink]
})
@InjectUser()
export class Dashboard extends MeteorComponent {
	user: Meteor.User;
	person: Person;

	constructor() {
		super();

		if (this.user) {
			this.person = Profiles.findOne({account: this.user._id});
		}
	}

	userName() {
		if (this.person) {
			return this.person.name
		} else {
			return this.user.emails[0].address
		}
	}

}