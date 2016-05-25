// Core
import 'reflect-metadata';
import 'zone.js/dist/zone';
import {Component} 		from '@angular/core';
import {bootstrap} 		from 'angular2-meteor-auto-bootstrap';

// Component
import {Dashboard} 			from './imports/dashboard/dashboard';
import {NewsFeed} 			from './imports/news-feed/news-feed';
import {Sidebar} 			from './imports/sidebar/sidebar';
import {Welcome} 			from './imports/welcome/welcome';
import {MyTeamComponent}	from './imports/my-team/my-team';
import {TeamForm}			from './imports/team-form/team-form';
import {MembersList} 		from './imports/members-list/members-list';
import {LoginForm} 			from './imports/auth/login-form';

// Routing
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, Router, RouteConfig, CanActivate, RouterLink, ComponentInstruction} from '@angular/router-deprecated';
import {InjectGuard, Auth} from '../services/authentication';

@Component({
	selector: 'app',
	templateUrl: 'client/app.html',
	directives: [Sidebar, NewsFeed, ROUTER_DIRECTIVES, RouterLink]
})
@RouteConfig([
	{ path: '/dashboard', as: 'Dashboard', component: Dashboard, useAsDefault: true },
	{ path: '/welcome', as: 'Welcome', component: Welcome },
	{ path: '/my-teams/...', as: 'MyTeam', component: MyTeamComponent },
	{ path: '/add-team/...', as: 'AddTeam', component: TeamForm },
	{ path: '/team/:teamId', as: 'ViewTeam', component: MembersList },
])
@InjectGuard()
class App {
	auth: Auth;

	constructor(router: Router) {
		this.auth.check(router);
	}
}

@Component({
	selector: 'root',
	template: '<router-outlet [protected]></router-outlet>',
	directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
	{ path: '/login', as: 'Login', component: LoginForm, useAsDefault: true },
	{ path: '/...', as: 'App', component: App }
])
class AnyTeam {}
bootstrap(AnyTeam, [ROUTER_PROVIDERS]);