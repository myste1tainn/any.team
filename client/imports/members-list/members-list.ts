import 'reflect-metadata';
import {Meteor} 				from 'meteor/meteor';
import {MeteorComponent} 		from 'angular2-meteor';
import {Mongo}					from 'meteor/mongo';
import {Component} 				from '@angular/core';
import {MemberInvite}	 		from '../member-invite/member-invite';
import {Teams} 					from '../../../collections/teams';
import {TeamMembers}			from '../../../collections/team-members';
import {Profiles}				from '../../../collections/profiles';

import {InjectUser, RequireUser} 			from 'angular2-meteor-accounts-ui'
import {RouteParams, RouteConfig} 			from '@angular/router-deprecated';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES} from '@angular/router-deprecated';


@Component({
	selector: 'members-list',
	templateUrl: 'client/imports/members-list/members-list.html',
	directives: [ROUTER_DIRECTIVES, MemberInvite]
})

@InjectUser('user')
export class MembersList extends MeteorComponent {
	user: Meteor.User;
	team: Team;
	members: Mongo.Cursor<TeamMember>;
	showInvite: boolean;

	constructor(private routeParams: RouteParams) {
		super();
		let teamId = this.routeParams.get('teamId');

		this.subscribe('teamMembers', () => {
			this.members = TeamMembers.find({teamId: teamId});
		}, true);
		
		this.subscribe('teams', () => {
			this.team = Teams.findOne(teamId);
		}, true);
	}

	toggleShowInvite() {
		this.showInvite = !this.showInvite;
	}

	removeMember(member: TeamMember) {
		TeamMembers.remove({ _id: member._id });
	}
}