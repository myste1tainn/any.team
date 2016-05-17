import 'reflect-metadata';
import 'zone.js/dist/zone';
import {Component} from '@angular/core';
import {Dashboard} from './imports/dashboard/dashboard';
import {MembersList} from './imports/my-team/my-team';
import {PersonalProfile} from './imports/personal-profile/personal-profile';
import {PersonalProfileForm} from './imports/personal-profile-form/personal-profile-form';
import {bootstrap} from 'angular2-meteor-auto-bootstrap';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig} from '@angular/router-deprecated';

@Component({
	selector: 'app',
	templateUrl: 'client/app.html',
	directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
	{ path: '/', as: 'Dashboard', component: Dashboard },
	{ path: '/:userName/home', as: 'Dashboard', component: Dashboard },
	{ path: '/:userName/my-team', as: 'MembersList', component: MembersList },
	{ path: '/:userName/profile', as: 'PersonalProfile', component: PersonalProfile },
	{ path: '/:userName/profile-fill', as: 'PersonalProfileForm', component: PersonalProfileForm },
	// { path: '/my-team/add-member', as: 'MemberForm', component: MemberForm },
	// { path: '/member/:memberId', as: 'MemberDetails', component: MemberDetails },
	// { path: '/projects', as: 'ProjectsList', component: ProjectsList },
	// { path: '/proejct/:proejectId', as: 'ProjectDetails', component: ProjectDetails },
])

class AnyTeam {}

bootstrap(AnyTeam, [ROUTER_PROVIDERS]);