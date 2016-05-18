import {Mongo} from 'meteor/mongo';

export let Roles = new Mongo.Collection<Role>('roles');