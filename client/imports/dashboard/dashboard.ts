import {Meteor} from 'meteor/meteor';
import {Component} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';
import {Welcome} from '../welcome/welcome';
import {LoginButtons, InjectUser, RequireUser} from 'angular2-meteor-accounts-ui';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig, RouterLink} from '@angular/router-deprecated';
import {InjectGuard, Auth} from '../../../services/authentication';

@Component({
	selector: 'dashboard',
	templateUrl: 'client/imports/dashboard/dashboard.html',
	directives: [LoginButtons, RouterLink]
})
@InjectUser('user')
@InjectGuard()
export class Dashboard extends MeteorComponent {
	user: Meteor.User;
	profile: Profile;

	constructor() {
		super();

		if (this.user) {
			
		}
	}

	logout() {
		Meteor.logout();

	}

}