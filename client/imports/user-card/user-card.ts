import {Meteor} 				from 'meteor/meteor';
import {MeteorComponent} 		from 'angular2-meteor';
import {Mongo}					from 'meteor/mongo';
import {Component}				from '@angular/core';

import {FB}		 				from '../../apis/facebook';
import {InjectUser} 			from 'angular2-meteor-accounts-ui';
import {InjectGuard, Auth}		from '../../../services/authentication';
import {Router}					from '@angular/router-deprecated';

@Component({
	selector: 'user-card',
	templateUrl: 'client/imports/user-card/user-card.html'
})
@InjectUser('user')
@InjectGuard()
export class UserCard extends MeteorComponent {
	user: Meteor.User;
	auth: Auth;

	constructor(private router: Router) {
		super();

		this.getProfilePicture();
	}

	userLoaded() {
		return !!this.user
	}

	getProfilePicture() {

		if (!!this.user && !!this.user.profile && !!this.user.profile.picture) {

		} else {
			var _self = this;
			FB.api('/v2.6/{user-id}/picture', (res) => {

				_self.subscribe('current-user', () => {
					Meteor.users.update({ _id: this.user._id }, {
						$set: {
							'profile.picture': res.data.url
						}
					})
				})

			})
		}

	}

	logout() {
		Meteor.logout(() => {
			this.auth.check(this.router);
		});
	}

}