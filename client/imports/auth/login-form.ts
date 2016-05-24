import {Meteor}					from 'meteor/meteor';
import {MeteorComponent} 		from 'angular2-meteor';
import {Mongo}					from 'meteor/mongo';
import {Component, Inject}		from '@angular/core';
import {ApplicationRef} 		from '@angular/core';
import {Accounts}				from 'meteor/accounts-base';

import {Router} from '@angular/router-deprecated';		
import {FormBuilder, ControlGroup, Validators, Control} from '@angular/common';
import {InjectUser}	from 'angular2-meteor-accounts-ui';


@Component({
	selector: 'login-form',
	templateUrl: 'client/imports/auth/login-form.html'
})

@Inject(ApplicationRef)
@InjectUser('user')
export class LoginForm extends MeteorComponent {
	user: MeteorComponent
	form: ControlGroup;
	isSignup: boolean;
	errorMessage: string;

	constructor(
		private application: ApplicationRef,
		private router: Router) {
		super();

		this.redirectIfAuthenticate();

		let fb = new FormBuilder();
		
		this.form = fb.group({
			email: [''],
			password: ['']
		});
	}

	redirectIfAuthenticate() {
		if (this.user) {
			this.redirect();	
		}
	}

	redirect() {
		this.router.navigate(['/App/Welcome']);
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
			
			if (ex) {}
			else { this.redirect(); }
		});
	}
	signup() {
		let email = this.form.value.email;
		let password = this.form.value.password;
		let id = Accounts.createUser({
			email: email,
			password: password
		}, (ex) => {
			this.errorMessage = (ex) ? 'Incorrect username / password' : null;
			this.application.tick();

			if (ex) {}
			else { this.redirect(); }
		});
	}

	logout() {
		Meteor.logout();
	}

}
