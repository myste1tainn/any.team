import {Meteor} from 'meteor/meteor';
import {Component} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';
import {Profiles} from '../../../collections/profiles';
import {LoginButtons, InjectUser} from 'angular2-meteor-accounts-ui';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig, RouterLink} from '@angular/router-deprecated';

@Component({
	selector: 'sidebar',
	templateUrl: 'client/imports/sidebar/sidebar.html',
	directives: [ROUTER_DIRECTIVES]
})
@InjectUser('')
export class Sidebar extends MeteorComponent {
	user: Meteor.User;
	profile: Profile;

	constructor() {
		super();

		if (this.user) {
			this.profile = Profiles.findOne({account: this.user._id});
		}
	}

	userName() {
		if (this.profile) {
			return this.profile.name
		} else {
			return this.user.emails[0].address
		}
	}

}