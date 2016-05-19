import {Mongo} from 'meteor/mongo';

export let TeamMembers = new Mongo.Collection<TeamMember>('teamMembers');