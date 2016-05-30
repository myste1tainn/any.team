import {Meteor} from 'meteor/meteor';
import {Component} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';
import {FormBuilder, ControlGroup, Validators, Control} from '@angular/common';
import {InjectUser} from 'angular2-meteor-accounts-ui';
import {Router} from '@angular/router-deprecated';
import {InjectGuard, Auth} from '../../../services/authentication';


@Component({
	selector: 'Welcome',
	templateUrl: 'client/imports/welcome/welcome.html'
})
@InjectUser('user')
@InjectGuard()
export class Welcome extends MeteorComponent {
	user: Meteor.User;
	form: ControlGroup;
	nameHasValue: boolean;
	redirect: (boolean) => void;
	auth: Auth;

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

			// This needs to be declare here.
			// If it is declared as public method then
			// `this` within the function won't work as it is used as callback
			this.redirect = (ok: boolean) => {

				if (ok) {

					// If user already has name, go to dashboard, otherwise welcome them
					if (!!this.user.profile.name) {
						this.router.navigate(['/App/Dashboard']);
					} else {
						this.router.navigate(['/Welcome']);
					}

				} else {

					this.router.navigate(['/Login']);

				}
			}
			this.auth.checkWithCallback(this.redirect);

		}, true);
	}

	saveProfile(form) {
		Meteor.users.update(this.user._id, {
			$set: {
				profile: { name: form.name }
			}
		})

		this.auth.checkWithCallback(this.redirect);
	}

	showAcitivityIndicator() {

	}

	show() {
		
	}
}