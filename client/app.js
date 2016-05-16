"use strict";
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
require('zone.js/dist/zone');
var core_1 = require('@angular/core');
var dashboard_1 = require('./imports/dashboard/dashboard');
var my_team_1 = require('./imports/my-team/my-team');
var angular2_meteor_auto_bootstrap_1 = require('angular2-meteor-auto-bootstrap');
var router_deprecated_1 = require('@angular/router-deprecated');
var AnyTeam = (function () {
    function AnyTeam() {
    }
    AnyTeam = __decorate([
        core_1.Component({
            selector: 'app',
            templateUrl: 'client/app.html',
            directives: [router_deprecated_1.ROUTER_DIRECTIVES]
        }),
        router_deprecated_1.RouteConfig([
            { path: '/', as: 'Dashboard', component: dashboard_1.Dashboard },
            { path: '/:userName/home', as: 'Dashboard', component: dashboard_1.Dashboard },
            { path: '/:userName/my-team', as: 'MembersList', component: my_team_1.MembersList },
            { path: '/:userName/profile', as: 'PersonalProfile', component: PersonalProfile },
        ]), 
        __metadata('design:paramtypes', [])
    ], AnyTeam);
    return AnyTeam;
}());
angular2_meteor_auto_bootstrap_1.bootstrap(AnyTeam, [router_deprecated_1.ROUTER_PROVIDERS]);
//# sourceMappingURL=app.js.map