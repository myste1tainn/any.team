import {Mongo} from 'meteor/mongo';

export let Profiles = new Mongo.Collection<Person>('profiles');