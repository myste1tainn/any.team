import {Meteor} from 'meteor/meteor';
import {MeteorComponent} from 'angular2-meteor';
import {RouterOutlet, Router} from '@angular/router-deprecated';
import {Directive, TypeDecorator} from '@angular/core';

export class Auth {

	constructor(private redirectRoute: any[]) {

	}

	check(router: Router) {
		let user = Meteor.user();

		if (!!user) {

		} else {
			router.navigate(this.redirectRoute);
		}
	}

}

class InjectGuardAnnotation {
	constructor(public propName: string = 'auth') { }
}

export function InjectGuard(propName: string = 'auth', redirectRoute: any[] = ['/Login']) : (cls: any) => any {
	var annInstance = new InjectGuardAnnotation(propName);
	var TypeDecorator: TypeDecorator = <TypeDecorator>function TypeDecorator(cls) {
		var propName = annInstance.propName;
		var fieldName = `_${propName}`;
		var injected = `${fieldName}Injected`;
		Object.defineProperty(cls.prototype, propName, {
			get: function() {
				if (!this[injected]) {
					this[fieldName] = new Auth(redirectRoute);
					if (this.autorun) {
						this.autorun(() => {
							this[fieldName] = new Auth(redirectRoute);
						}, true);
					}
					this[injected] = true;
				}
				return this[fieldName];
			},
			enumerable: true,
			configurable: false
		});
		return cls;
	};
	return TypeDecorator;
};