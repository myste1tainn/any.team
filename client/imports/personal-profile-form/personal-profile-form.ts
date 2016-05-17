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
	profile: Person;
	personalProfileForm: ControlGroup;
	nameHasValue: boolean;
	profileSaved: boolean

	constructor() {
		super();
		let fb = new FormBuilder();

		this.personalProfileForm = fb.group({
			name: ['']
		});

		this.personalProfileForm.valueChanges.subscribe(data => {
			this.nameHasValue = (data.name != '')
		});

		this.subscribe('persons', () => {
			this.profile = Persons.findOne({ user: this.user._id });
			
			if (this.profile) {
				this.personalProfileForm.controls['name'].updateValue(this.profile.name);
			}

		}, true)
	}

	saveProfile(profile) {
		this.profileSaved = true;
		if (this.profile) {
			Persons.update(this.profile._id, {
				$set: {
					name: profile.name,
				}
			})
		} else {
			Persons.insert({
				name: profile.name,
				user: this.user._id
			})
		}
	}

	showAcitivityIndicator() {

	}

	show() {
		
	}
}