import 'reflect-metadata';
import {Component} 			from '@angular/core';
import {MeteorComponent} 	from 'angular2-meteor';
import {Teams} 				from '../../../collections/teams';
import {TeamMembers}		from '../../../collections/team-members';

import {InjectUser, RequireUser} from 'angular2-meteor-accounts-ui'

@Component({
	selector: 'team-form',
	templateUrl: 'client/imports/team-form/team-form.html',
})

@InjectUser('user')
export class TeamForm extends MeteorComponent {
	user: Meteor.User;
	members: Mongo.Collection<TeamMember>;

	constructor() {
		super();

		this.subscribe('teamMembers', true);
	}

	addTeam(team: Team) {
		this.subscribe('teams', () => {
			Teams.insert({
				name: team.name,
				owner: this.user._id
			})
		}, true);
	}

	addMember(team: Team, user: Meteor.User) {
		TeamMembers.insert({
			userId: user._id,
			teamId: team._id
		})
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