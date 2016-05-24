import 'reflect-metadata';
import {Meteor} 				from 'meteor/meteor';
import {MeteorComponent} 		from 'angular2-meteor';
import {Mongo}					from 'meteor/mongo';
import {Component,ElementRef}	from '@angular/core';

// Component
import {TeamForm}				from '../team-form/team-form';
import {MembersList}			from '../members-list/members-list';

// Model
import {Teams} 					from '../../../collections/teams';

import {ROUTER_DIRECTIVES, RouteConfig, RouteParams} from '@angular/router-deprecated';
import {InjectUser, RequireUser} from 'angular2-meteor-accounts-ui'

@Component({
	selector: 'teams-list',
	templateUrl: 'client/imports/my-team/teams-list.html',
	directives: [ROUTER_DIRECTIVES]
})
@InjectUser('user')
export class TeamsList extends MeteorComponent {
	user: Meteor.User;
	teams: Mongo.Cursor<Team>;
	isSimple: boolean;
	limit: integer;

	constructor(el: ElementRef) {
		super();

		// Teams list may either be display in simple list or manageable list
		let simple = el.nativeElement.attributes.simple;
		this.isSimple = (simple) ? eval(simple.value) : false;

		let limit = el.nativeElement.attributes.limit;
		this.limit = (limit) ? eval(limit.value) : 10;

		this.subscribe('teams', () => {
			this.teams = Teams.find({owner: this.user._id}, {limit: this.limit});
		}, true)
	}

	removeTeam(team: Team) {	
		Teams.remove({_id: team._id});
	}
}


@Component({
	selector: 'my-team',
	templateUrl: 'client/imports/my-team/my-team.html',
	directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
	{ path: '/list', as: 'TeamsList', component: TeamsList, useAsDefault: true },
	{ path: '/view/:teamId', as: 'ViewMembers', component: MembersList },
])
export class MyTeamComponent {}