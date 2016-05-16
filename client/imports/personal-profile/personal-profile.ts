import 'reflect-metadata';
import {Component} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';
import {Persons} from '../../../collections/persons';
import {RouteParams} from '@angular/router-deprecated';

@Component({
	selector: 'personal-profile',
	templateUrl: 'client/imports/personal-profile/personal-profile.html'
})

export class PersonalProfile extends MeteorComponent {
	person: Object;

	constructor(params: RouteParams) {
		super();
		var personId = params.get('personId');

		this.subscribe('persons', function() {
			this.person = Persons.findOne(personId);
		}, true);
	}

}

