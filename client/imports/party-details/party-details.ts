import {Meteor} from 'meteor/meteor';
import {MeteorComponent} from 'angular2-meteor';
import {Component} from '@angular/core';
import {RouteParams, RouterLink, CanActivate, ComponentInstruction} from '@angular/router-deprecated';
import {RequireUser} from 'angular2-meteor-accounts-ui';

import {Parties} from '../../../collections/parties.ts';

function checkPermissions(instruction: ComponentInstruction) {
	var partyId = instruction.params['partyId'];
	var party = Parties.findOne(partyId);
	return (party && party.owner == Meteor.userId());
}

@Component({
	selector: 'party-details',
	templateUrl: '/client/imports/party-details/party-details.html',
	directives: [RouterLink]
})
@CanActivate(checkPermissions)
export class PartyDetails extends MeteorComponent {
	party: Party;

	constructor(params: RouteParams) {
		super();
		var partyId = params.get('partyId');
		this.subscribe('party', partyId, () => {
			this.party = Parties.findOne(partyId);
		}, true);
	}

	saveParty(party) {
		if (Meteor.userId()) {
			Parties.update(party._id, {
				$set: {
					name: party.name,
					description: party.description,
					location: party.location
				}
			})
		} else {
			alert('Please log in to change this party');
		}
	}

}