import {Meteor} from 'meteor/meteor';
import {Component, ApplicationRef} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';
import {Welcome} from '../welcome/welcome';
import {LoginButtons, InjectUser, RequireUser} from 'angular2-meteor-accounts-ui';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig, RouterLink, Router} from '@angular/router-deprecated';
import {InjectGuard, Auth} from '../../../services/authentication';
import {FB} from '../../apis/facebook';
import {UserCard} from '../user-card/user-card';

@Component({
	selector: 'dashboard',
	templateUrl: 'client/imports/dashboard/dashboard.html',
	directives: [LoginButtons, RouterLink, UserCard],
	host: {'class': 'ng-animate fast fade-in'}
})
@InjectUser('user')
@InjectGuard()
export class Dashboard extends MeteorComponent {
	user: Meteor.User;
	auth: Auth;

	constructor(router: Router, private application: ApplicationRef) {
		super();
		var _self = this;
		this.auth.check(router);
	}

}
