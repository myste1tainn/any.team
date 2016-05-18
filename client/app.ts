import 'reflect-metadata';
import 'zone.js/dist/zone';
import {Component} from '@angular/core';
import {Main} from './imports/main/main';
import {Dashboard} from './imports/dashboard/dashboard';
import {NewsFeed} from './imports/news-feed/news-feed';
import {Sidebar} from './imports/sidebar/sidebar';
import {MembersList} from './imports/my-team/my-team';
import {PersonalProfile} from './imports/personal-profile/personal-profile';
import {Welcome} from './imports/welcome/welcome';
import {bootstrap} from 'angular2-meteor-auto-bootstrap';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig, RouterLink} from '@angular/router-deprecated';

@Component({
	selector: 'app',
	templateUrl: 'client/app.html',
	directives: [Sidebar, NewsFeed, ...ROUTER_DIRECTIVES, RouterLink]
})
@RouteConfig([
	
	{ path: '/dashboard', as: 'Dashboard', component: Dashboard },
	{ path: '/welcome', as: 'Welcome', component: Welcome },
	// { path: '/:userName/my-team', as: 'MembersList', component: MembersList },
	// { path: '/:userName/profile', as: 'PersonalProfile', component: PersonalProfile },
	// { path: '/my-team/add-member', as: 'MemberForm', component: MemberForm },
	// { path: '/member/:memberId', as: 'MemberDetails', component: MemberDetails },
	// { path: '/projects', as: 'ProjectsList', component: ProjectsList },
	// { path: '/proejct/:proejectId', as: 'ProjectDetails', component: ProjectDetails },
])

class AnyTeam {}

bootstrap(AnyTeam, [ROUTER_PROVIDERS]);