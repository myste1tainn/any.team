import 'reflect-metadata';
import {Component} from '@angular/core';
import {Profiles} from '../../../collections/profiles';
import {RouteParams} from '@angular/router-deprecated';

@Component({
	selector: 'personal-profile',
	templateUrl: 'client/imports/personal-profile/personal-profile.html'
})

export class PersonalProfile {
	person: Object;

	constructor(params: RouteParams) {
		var personId = params.get('personId');

		this.person = Profiles.findOne(personId);
	}

}

