import 'reflect-metadata';
import {Component} 			from '@angular/core';
import {MeteorComponent} 	from 'angular2-meteor';
import {Teams} 				from '../../../collections/teams';
import {TeamMembers}		from '../../../collections/team-members';

import {InjectUser, RequireUser} from 'angular2-meteor-accounts-ui'

@Component({
	selector: 'members-list',
	templateUrl: 'client/imports/my-team/my-team.html'
})
@InjectUser('user')
export class Members {}
export class MembersList extends MeteorComponent {
	user: Meteor.User;
	members: Mongo.Cursor<TeamMember>;

	constructor(private routeParams: RouteParams) {
		console.log(this);
		super();
		let teamId = this.routeParams.get('teamId');
		this.subscribe('teamsMembers', () => {
			this.members = TeamMembers.find({teamId: teamId});
		}, true)
	}

	removeTeamMember(member: TeamMember) {
		TeamMembers.remove({_id: member._id});
	}
}