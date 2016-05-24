import 'reflect-metadata';
import {Meteor} 				from 'meteor/meteor';
import {Component} 				from '@angular/core';
import {MeteorComponent} 		from 'angular2-meteor';
import {Profiles} 				from '../../../collections/profiles';
import {TeamMembers} 			from '../../../collections/team-members';
import {RouteParams} 			from '@angular/router-deprecated';
import {InjectUser}		 		from 'angular2-meteor-accounts-ui';
import {FormBuilder, ControlGroup, Validators, Control} from '@angular/common';

@Component({
	selector: 'member-invite',
	templateUrl: 'client/imports/member-invite/member-invite.html'
})

@InjectUser('user')
export class MemberInvite extends MeteorComponent {
	form: ControlGroup;
	user: Meteor.User;
	teamId: string;
	showDialog: boolean

	constructor(private routeParams: RouteParams) {
		super();
		let fb = new FormBuilder();
		
		this.form = fb.group({
			email: ['']
		});

		this.teamId = routeParams.get('teamId');
	}

	toggleShowDialog() {
		this.showDialog = !this.showDialog;
	}

	invite(formValue) {
		this.subscribe('users', () => {
			let id = Meteor.users.insert({
				name: formValue.email,
				emails: [{address:formValue.email, verified:false}],
				requestAccepted: false
			});

			this.subscribe('users', () => {
				let user = Meteor.users.findOne(id);

				if (user) {
					this.addMember(user);
				}
			}, true);
		}, true);
	}

	addMember(user: Meteor.User) {
		this.subscribe('teamMembers', () => {
			TeamMembers.insert({
				teamId: this.teamId,
				user: user
			})

			// Close the dialog
			this.showDialog = false;
		}, true);
	}

}
