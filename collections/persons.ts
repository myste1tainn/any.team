import {Mongo} from 'meteor/mongo';

export let Persons = new Mongo.Collection<Person>('persons');