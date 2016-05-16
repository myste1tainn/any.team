import 'reflect-metadata';
import {MeteorComponent} from 'angular2-meteor';
import {Component} from '@angular/core';
import {Mongo} from 'meteor/mongo';
import {PartiesForm} from '../parties-form/parties-form.ts';
import {Parties} from '../../../collections/parties.ts';
import {RouterLink} from '@angular/router-deprecated';
import {LoginButtons} from 'angular2-meteor-accounts-ui';


@Component({
	selector: 'parties-list',
	templateUrl: 'client/imports/parties-list/parties-list.html',
	directives: [PartiesForm, RouterLink, LoginButtons]
})

export class PartiesList extends MeteorComponent {
	parties: Mongo.Cursor<Party>;

	constructor() {
		super();
		this.subscribe('parties', () => {
			this.parties = Parties.find();
		}, true);
	}

	removeParty(party) {
		Parties.remove(party._id);
	}

	search (value: string) {
		if (value) {
			this.parties = Parties.find({ location: value });
		} else {
			this.parties = Parties.find();
		}
	}
}

