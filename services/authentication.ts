import {Meteor} from 'meteor/meteor';
import {MeteorComponent} from 'angular2-meteor';
import {RouterOutlet, Router} from '@angular/router-deprecated';
import {Directive, TypeDecorator, NgZone} from '@angular/core';

export class Auth {

	constructor(private notAuthenticateRoute: any[],
				private authenticatedRoute: any[]) {

	}

	/**
	 * Auth.check(Router, (boolean) => void?)
	 * Shorthand for Auth.checkWithRouter(Router, (boolean) => void?)
	 * 
	 * @var	Router router -	the router to be used in redirection
	 */
	check(router: Router) {
		this.checkWithRouter(router);
	}
	/**
	 * Auth.checkWithRouter(Router, (boolean) => void?)
	 * Check the authentication and use the specified router in redirection
	 * 
	 * @var	Router router -	the router to be used in redirection
	 */
	checkWithRouter(router: Router) {
		let user = Meteor.user();
		let authenticated = !!user;

		if (authenticated) {
			router.navigate(this.authenticatedRoute);
		} else {
			router.navigate(this.notAuthenticateRoute);
		}
	}

	/**
	 * Auth.checkWithCallback((boolean) => void)
	 * Check the authenticate and pass the results to the callback
	 * 
	 * @var		varname
	 */
	checkWithCallback(callback: (ok: boolean) => void) {
		let user = Meteor.user();
		let authenticated = !!user;

		callback(authenticated);
	}

}

/**
 * InjectGuardAnnotation
 * Serve as a helper to InjectGuard decorator to help remembering property name
 * 
 * @var string propName - property name to remember
 */
class InjectGuardAnnotation {
	constructor(public propName: string = 'auth') { }
}

/**
 * InjectGuard
 * An injector for injecting Guard (as Auth class) to the specified property name
 * 
 * @var string?	propName - the property name which Guard will be injected as
 * @var any[]?	notAuthenticatedRoute - route which the guard will redirect to if the authenticatio FAIL
 * @var any[]?	authenticatedRoute - route which the guard will redirect to if the authenticatio PASS
 */
export function InjectGuard(propName: string = 'auth', 
							notAuthenticateRoute: any[] = ['/Login'],
							authenticatedRoute: any[] = ['/App/Dashboard']) : (cls: any) => any {

	// An instance of annotation (InjectGuardAnnotation in this case)
	var annInstance = new InjectGuardAnnotation(propName);

	/**
	 * TypeDecorator a callback back that causes the base class to have 
	 * the specified 'injectable' (Guard => class Auth in this case) injected as their property
	 *
	 * @var Class cls - the base class (target) to be injected
	 */
	var TypeDecorator: TypeDecorator = <TypeDecorator>function TypeDecorator(cls) {
		var propName = annInstance.propName;
		var fieldName = `_${propName}`;
		var injected = `${fieldName}Injected`;

		// Defining the property on the specified class's prototype
		Object.defineProperty(cls.prototype, propName, {

			// Whenever the property is get (being called like this.propName)
			// Call this function
			get: function() {
				
				// Check if it's already injected
				if (!this[injected]) {

					// No yet, inject one before returning
					this[fieldName] = new Auth(notAuthenticateRoute, authenticatedRoute);

					// Check if this class has autorun
					if (this.autorun) {
						// Has autorun also do autorun on the property
						this.autorun(() => {
							this[fieldName] = new Auth(notAuthenticateRoute, authenticatedRoute);
						}, true);
					}

					// Marked as injected property
					this[injected] = true;
				}
				// Already injected just return the set field name

				return this[fieldName];
			},

			// Is this property enumerable?
			enumerable: true,

			// Is this property re-configurable?
			configurable: false
		});

		// Return the class
		return cls;
	};

	// Return the TypeDecorator which will be called some where in ng2 system
	return TypeDecorator;
};