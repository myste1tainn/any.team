import {Meteor} from 'meteor/meteor';
import {Component} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';
import {FormBuilder, ControlGroup, Validators, Control} from '@angular/common';
import {Profiles} from '../../../collections/profiles';
import {InjectUser} from 'angular2-meteor-accounts-ui';

@Component({
	selector: 'Welcome',
	templateUrl: 'client/imports/welcome/welcome.html'
})
@InjectUser('')
export class Welcome extends MeteorComponent {
	user: Meteor.User;
	profile: Profile;
	personalProfileForm: ControlGroup;
	nameHasValue: boolean;
	profileSaved: boolean;
	profileExisted: boolean;

	constructor() {
		super();
		let fb = new FormBuilder();

		this.personalProfileForm = fb.group({
			name: ['']
		});

		this.personalProfileForm.valueChanges.subscribe(data => {
			this.nameHasValue = (data.name != '')
		});

		this.subscribe('profiles', () => {
			this.profile = Profiles.findOne({ user: this.user._id });
			
			if (this.profile) {
				this.personalProfileForm.controls['name'].updateValue(this.profile.name);
				this.profileExisted = true;
			}

		}, true)
	}

	saveProfile(profile) {
		this.profileSaved = true;
		if (this.profile) {
			Profiles.update(this.profile._id, {
				$set: {
					name: profile.name,
				}
			})
		} else {
			Profiles.insert({
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