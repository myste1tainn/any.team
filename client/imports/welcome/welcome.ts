import {Meteor} from 'meteor/meteor';
import {Component} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';
import {FormBuilder, ControlGroup, Validators, Control} from '@angular/common';
import {Profiles} from '../../../collections/profiles';
import {InjectUser} from 'angular2-meteor-accounts-ui';
import {Router} from '@angular/router-deprecated';

@Component({
	selector: 'Welcome',
	templateUrl: 'client/imports/welcome/welcome.html'
})
@InjectUser('user')
export class Welcome extends MeteorComponent {
	user: Meteor.User;
	form: ControlGroup;
	nameHasValue: boolean;

	constructor(private router: Router) {
		super();

		let fb = new FormBuilder();

		this.form = fb.group({
			name: ['']
		});

		this.form.valueChanges.subscribe(data => {
			this.nameHasValue = (data.name != '')
		});

		this.subscribe('users', () => {

		}, true)
	}

	saveProfile(form) {
		Meteor.users.update(this.user._id, {
			$set: {
				name: form.name,
			}
		})
	}

	showAcitivityIndicator() {

	}

	show() {
		
	}
}