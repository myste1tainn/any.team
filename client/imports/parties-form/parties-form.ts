import 'reflect-metadata';
import {Component} from '@angular/core';
import {Parties} from '../../../collections/parties.ts';
import {FormBuilder, ControlGroup, Validators, Control} from '@angular/common';
import {Meteor} from 'meteor/meteor';
import {MeteorComponent} from 'angular2-meteor';
import {InjectUser} from 'angular2-meteor-accounts-ui';


@Component({
	selector: 'parties-form',
	templateUrl: 'client/imports/parties-form/parties-form.html'
})
@InjectUser()
export class PartiesForm extends MeteorComponent {
	user: Meteor.User;
	partiesForm: ControlGroup;

	constructor() {
		super();
		let fb = new FormBuilder();
		
		this.partiesForm = fb.group({
			name: ['', Validators.required],
			description: [''],
			location: ['', Validators.required],
			owner: Meteor.userId(),
			public: [false]
		});
	}

	addParty(party) {
		if (Meteor.userId()) {
			Parties.insert({
				name: party.name,
				description: party.description,
				location: party.location,
				public: party.public,
				owner: Meteor.userId()
			});

			(this.partiesForm.controls['name']).updateValue('');
			(this.partiesForm.controls['description']).updateValue('');
			(this.partiesForm.controls['location']).updateValue('');
			(this.partiesForm.controls['public']).updateValue(false);
		} else {
			alert('Please log in to add a party');
		}
	}

}