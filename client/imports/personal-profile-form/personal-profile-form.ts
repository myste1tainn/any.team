import {Component} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';
import {FormBuilder, ControlGroup, Validators, Control} from '@angular/common';
import {Persons} from '../../../collections/persons';
import {InjectUser} from 'angular2-meteor-accounts-ui';

@Component({
	selector: 'PersonalProfileForm',
	templateUrl: 'client/imports/personal-profile-form/personal-profile-form.html'
})
@InjectUser()
export class PersonalProfileForm extends MeteorComponent {
	user: Meteor.User;
	personalProfileForm: ControlGroup;
	nameHasValue: boolean;

	constructor() {
		super();
		let fb = new FormBuilder();
		
		this.personalProfileForm = fb.group({
			name: ['']
		});

		this.personalProfileForm.valueChanges.subscribe(data => {
			this.nameHasValue = (data.name != '')
		});
	}

	saveProfile(profile) {
		Persons.update(profile._id, {
			$set: {
				name: profile.name
			}
		})
	}

	show() {
		console.log(this.personalProfileForm.controls['name']._value);
	}
}