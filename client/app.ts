// Core
import 'reflect-metadata';
import 'zone.js/dist/zone';
import {Meteor} from 'meteor/meteor';
import {Component, provide} from '@angular/core';
import {bootstrap} from 'angular2-meteor-auto-bootstrap';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig} from '@angular/router-deprecated';
import {Mongo} from 'meteor/mongo';
import {APP_BASE_HREF} from '@angular/common';

// Application modules
import {PartiesForm} from './imports/parties-form/parties-form.ts';	
import {PartiesList} from './imports/parties-list/parties-list.ts';
import {PartyDetails} from './imports/party-details/party-details.ts';
import {Parties} from '../collections/parties.ts';

@Component({
	selector: 'app',
	templateUrl: 'client/app.html',
	directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
	{ path: '/', as: 'PartiesList', component: PartiesList },
	{ path: '/party/:partyId', as: 'PartyDetails', component: PartyDetails },
])

class Socially {
	parties: Mongo.Cursor<Party>;

	constructor() {
		Meteor.subscribe('parties', function() {
			this.parties = Parties.find();
		})
	}

	removeParty(party) {
		Parties.remove(party._id);
	}
}

bootstrap(Socially, [ROUTER_PROVIDERS]);
