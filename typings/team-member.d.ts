interface TeamMember {
	_id?: string;
	role?: string; // has a role
	user: Meteor.User;
	teamId: string; // belongs to team
}