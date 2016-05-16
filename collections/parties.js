"use strict";
var mongo_1 = require('meteor/mongo');
exports.Parties = new mongo_1.Mongo.Collection('parties');
exports.Parties.allow({
    insert: function () {
        var user = Meteor.user();
        return !!user;
    },
    update: function () {
        var user = Meteor.user();
        return !!user;
    },
    remove: function () {
        var user = Meteor.user();
        return !!user;
    }
});
//# sourceMappingURL=parties.js.map