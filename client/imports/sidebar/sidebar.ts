import {Meteor} from 'meteor/meteor';
import {Component} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';
import {TeamsList} from '../my-team/my-team';
import {LoginButtons, InjectUser} from 'angular2-meteor-accounts-ui';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig, RouterLink} from '@angular/router-deprecated';

@Component({
	selector: 'sidebar',
	templateUrl: 'client/imports/sidebar/sidebar.html',
	directives: [ROUTER_DIRECTIVES, TeamsList]
})
@InjectUser('user')
export class Sidebar extends MeteorComponent {
	user: Meteor.User;
	profile: Profile;

	constructor() {
		super();
	}

	userName() {
		return "SJDFKLDSJ";
	}

}