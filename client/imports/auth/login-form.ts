// Core
import {Meteor}					from 'meteor/meteor';
import {MeteorComponent} 		from 'angular2-meteor';
import {Mongo}					from 'meteor/mongo';
import {Component, Inject}		from '@angular/core';
import {ApplicationRef, NgZone}	from '@angular/core';
import {Accounts}				from 'meteor/accounts-base';

// APIs
import '../../apis/facebook';

// Other
import {Router} from '@angular/router-deprecated';		
import {FormBuilder, ControlGroup, Validators, Control} from '@angular/common';
import {InjectUser}	from 'angular2-meteor-accounts-ui';
import {InjectGuard, Auth} from '../../../services/authentication';



@Component({
	selector: 'login-form',
	templateUrl: 'client/imports/auth/login-form.html'
})
@Inject(ApplicationRef)
@InjectUser('user')
@InjectGuard()
export class LoginForm {
	auth: Auth;
	form: ControlGroup;
	isSignup: boolean;
	errorMessage: string;
	instance: LoginForm;

	redirect: (boolean) => void;

	constructor(
		private application: ApplicationRef,
		private router: Router,
		private zone: NgZone) {

		// This needs to be declare here.
		// If it is declared as public method then
		// `this` within the function won't work as it is used as callback
		this.redirect = (ok: boolean) => {
			this.zone.run(() => {
				if (ok) {

					// If user already has name, go to dashboard, otherwise welcome them
					let user = Meteor.user();
					if (!!user.name) {
						this.router.navigate(['/App/Dashboard']);
					} else {
						this.router.navigate(['/Welcome']);
					}

				}
			})
		}

		this.doAuthCheck();

		let fb = new FormBuilder();
		
		this.form = fb.group({
			email: [''],
			password: ['']
		});
	}

	doAuthCheck() {
		this.auth.checkWithCallback(this.redirect);
	}

	changeToLogin() {
		this.isSignup = false;
	}
	changeToSignup() {
		this.isSignup = true;
	}

	submit() {
		if (this.isSignup) {
			this.signup()
		} else {
			this.login()
		}
	}

	login() {
		let email = this.form.value.email;
		let password = this.form.value.password;
		Meteor.loginWithPassword(email, password, (ex) => {
			this.errorMessage = (ex) ? 'Incorrect username / password' : null;
			this.application.tick();
			this.doAuthCheck();
		});
	}

	loginWithFB() {
		Meteor.loginWithFacebook(
		{ requestPermissions: ['user_friends', 'public_profile', 'email'] },
		(ex) => {
			if (ex) {
				this.errorMessage = 'Failed to login with Facebook, please try again';
				this.application.tick();
			} else {
				this.doAuthCheck();
			}
		})
	}

	loginWithGoogle() {
		Meteor.loginWithGoogle({}, (ex) => {
			if (ex) {
				console.log(ex);
				this.errorMessage = 'Failed to login with Google+, please try again';
				this.application.tick();
			} else {
				this.doAuthCheck();
			}
		})
	}

	signup() {
		let email = this.form.value.email;
		let password = this.form.value.password;
		let id = Accounts.createUser({
			email: email,
			password: password
		}, (ex) => {
			this.errorMessage = (ex) ? ex.reason : null;
			this.application.tick();

			// If user signup without fail, then do authentication check
			this.doAuthCheck();
		});
	}

	logout() {
		Meteor.logout();
	}

}
