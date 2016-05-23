import 'reflect-metadata';
import {Meteor} 				from 'meteor/meteor';
import {MeteorComponent} 		from 'angular2-meteor';
import {Mongo}					from 'meteor/mongo';
import {Component} 				from '@angular/core';
import {MembersList}		from '../members-list/members-list';
import {Teams} 					from '../../../collections/teams';
import {TeamMembers} 			from '../../../collections/team-members';

import {FormBuilder, ControlGroup, Validators, Control} from '@angular/common';
import {InjectUser, RequireUser} from 'angular2-meteor-accounts-ui'
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig, Router} from '@angular/router-deprecated';

@Component({
	selector: 'home',
	template: ''
})
export class TeamNotCreatedYet {}


@Component({
	selector: 'team-form',
	templateUrl: 'client/imports/team-form/team-form.html',
	directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
	{ path: '/', as: 'Home', component: TeamNotCreatedYet, useAsDefault: true },
	{ path: '/:teamId/members', as: 'MembersList', component: MembersList }
])
@InjectUser('user')
export class TeamForm extends MeteorComponent {
	form: ControlGroup;
	user: Meteor.User;
	team: Mongo.Cursor<Team>;

	constructor(private router: Router) {
		super();

		let fb = new FormBuilder();
		
		this.form = fb.group({
			name: ['']
		});
	}

	cancelTeam(team: Team) {

	}

	normalizeString(str: string) : string {
		str = str.replace(/ /g, '-');
		str = str.toLowerCase();
		return str;
	}

	addTeam(team: Team) {
		this.subscribe('teams', () => {

			let id = Teams.insert({
				_id: this.normalizeString(team.name),
				name: team.name,
				owner: this.user._id
			})
			this.team = Teams.find({_id:id});

			// Go to child state member list to see all members and add them.
			this.router.navigate(['/ViewTeam', {teamId: id}]);
		}, true);
	}

	removeMember(member: TeamMember) {
		TeamMembers.remove(member._id);
	}

	changeRole(member: TeamMember, role: Role) {
		TeamMembers.update(member._id, {
			roleId: role._id
		})
	}
}