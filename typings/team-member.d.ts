interface TeamMember {
	_id?: string;
	roleId?: string; // has a role
	userId: string; // is a user
	teamId: string; // belongs to team
}