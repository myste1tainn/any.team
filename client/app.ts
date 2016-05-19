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
import {MyTeam, TeamsList}	from './imports/my-team/my-team';

// Routing
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig, RouterLink} from '@angular/router-deprecated';

@Component({
	selector: 'app',
	templateUrl: 'client/app.html',
	directives: [Sidebar, NewsFeed, ROUTER_DIRECTIVES, RouterLink]
})
@RouteConfig([
	{ path: '/dashboard', as: 'Dashboard', component: Dashboard },
	{ path: '/welcome', as: 'Welcome', component: Welcome },
	{ path: '/my-team/...', as: 'MyTeam', component: MyTeam }
	// { path: '/:userName/profile', as: 'PersonalProfile', component: PersonalProfile },
	// { path: '/my-team/add-member', as: 'MemberForm', component: MemberForm },
	// { path: '/member/:memberId', as: 'MemberDetails', component: MemberDetails },
	// { path: '/projects', as: 'ProjectsList', component: ProjectsList },
	// { path: '/proejct/:proejectId', as: 'ProjectDetails', component: ProjectDetails },
])

class AnyTeam {}

bootstrap(AnyTeam, [ROUTER_PROVIDERS]);