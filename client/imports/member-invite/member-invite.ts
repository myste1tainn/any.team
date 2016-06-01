import 'reflect-metadata';
import {Meteor} 				from 'meteor/meteor';
import {Component} 				from '@angular/core';
import {MeteorComponent} 		from 'angular2-meteor';
import {TeamMembers} 			from '../../../collections/team-members';
import {RouteParams} 			from '@angular/router-deprecated';
import {InjectUser}		 		from 'angular2-meteor-accounts-ui';

import {FormBuilder, ControlGroup, Validators, Control} from '@angular/common';


// Collections
import '../../../collections/methods.ts';

@Component({
	selector: 'member-invite',
	templateUrl: 'client/imports/member-invite/member-invite.html',
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

	invite(form) {
		this.subscribe('users', () => {

			let users = Meteor.users.find({ "emails.address": form.email }).fetch();
			var user = (users) ? users[0] : null;

			var id: string;

			if (!!user) {
				
			} else {
				id = Meteor.users.insert({
					name: form.email,
					emails: [{ address: form.email, verified: false }],
					requestAccepted: false
				});

				user = Meteor.users.findOne(id);
			}

			if (user) {
				this.addMember(user);
			}


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

			// Invite them through email
			this.call('invite', this.teamId, user._id, (error) => {
				if (error) {
					alert(`Failed to invite due to ${error}`);
					return;
				}

				alert('User successfully invited.');
			})
		}, true);
	}

}
