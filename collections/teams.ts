import {Mongo} from 'meteor/mongo';

export let Teams = new Mongo.Collection<Team>('teams');