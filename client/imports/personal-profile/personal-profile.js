"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require('reflect-metadata');
var core_1 = require('@angular/core');
var angular2_meteor_1 = require('angular2-meteor');
var router_deprecated_1 = require('@angular/router-deprecated');
var PersonalProfile = (function (_super) {
    __extends(PersonalProfile, _super);
    function PersonalProfile(params) {
        _super.call(this);
        var personId = params.get('personId');
        this.subscribe('persons', function () {
            this.person = Persons.findOne(personId);
        }, true);
    }
    PersonalProfile = __decorate([
        core_1.Component({
            selector: 'personal-profile',
            templateUrl: 'client/imports/personal-profile/personal-profile.html'
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.RouteParams])
    ], PersonalProfile);
    return PersonalProfile;
}(angular2_meteor_1.MeteorComponent));
exports.PersonalProfile = PersonalProfile;
//# sourceMappingURL=personal-profile.js.map