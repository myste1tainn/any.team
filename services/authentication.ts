import {Meteor} from 'meteor/meteor';
import {MeteorComponent} from 'angular2-meteor';
import {Directive} from '@angular/core';
import {makeDecorator} from '@angular/core/src/util/decorators';
import {ComponentInstruction, Router} from '@angular/router-deprecated';
import {InjectUser} from 'angular2-meteor-accounts-ui';

@Directive({
	selector: '[protected]'
})
export class Auth {
	redirectRoute: any[];

	constructor(private router: Router) {
		this.redirectRoute = ['/Login'];

		let user = Meteor.user();

		if (!!user) {
			console.log('logged-in')
		} else {
			this.router.navigate(this.redirectRoute);
		}
	}

	ngOnDestroy() {

	}
}