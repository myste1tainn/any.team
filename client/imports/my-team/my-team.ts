import 'reflect-metadata';
import {Component} 			from '@angular/core';
import {MeteorComponent} 	from 'angular2-meteor';

// Component
import {MembersList}		from '../members-list/members-list';
import {TeamForm} 			from '../team-form/team-form';

// Model
import {Teams} 				from '../../../collections/teams';
import {TeamMembers}		from '../../../collections/team-members';

import {ROUTER_DIRECTIVES, RouteConfig, RouteParams} from '@angular/router-deprecated';
import {InjectUser, RequireUser} from 'angular2-meteor-accounts-ui'


@Component({
	selector: 'members-list',
	templateUrl: 'client/imports/my-team/my-team.html',
	directives: [ROUTER_DIRECTIVES]
})
@InjectUser('user')
export class TeamsList extends MeteorComponent {
	user: Meteor.User;
	teams: Mongo.Cursor<Team>;

	constructor() {
		super();
		this.subscribe('teams', () => {
			this.teams = Teams.find({owner: this.user._id});
		}, true)
	}

	removeTeam(team: Team) {	
		Teams.remove({_id: team._id});
	}
}


@Component({
	selector: 'my-team',
	template: '<router-outlet></router-outlet>',
	directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
	{ path: '/', as: 'TeamsList', component: TeamsList, useAsDefault: true },
	{ path: '/members', as: 'MembersList', component: MembersList },
	{ path: '/add', as: 'TeamForm', component: TeamForm }
])
export class MyTeam {}