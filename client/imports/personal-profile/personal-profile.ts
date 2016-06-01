import 'reflect-metadata';
import {Component} from '@angular/core';
import {RouteParams} from '@angular/router-deprecated';

@Component({
	selector: 'personal-profile',
	templateUrl: 'client/imports/personal-profile/personal-profile.html'
})

export class PersonalProfile {
	person: Object;

	constructor(params: RouteParams) {
		
	}

}

