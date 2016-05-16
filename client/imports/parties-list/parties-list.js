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
var angular2_meteor_1 = require('angular2-meteor');
var core_1 = require('@angular/core');
var parties_form_ts_1 = require('../parties-form/parties-form.ts');
var parties_ts_1 = require('../../../collections/parties.ts');
var router_deprecated_1 = require('@angular/router-deprecated');
var angular2_meteor_accounts_ui_1 = require('angular2-meteor-accounts-ui');
var PartiesList = (function (_super) {
    __extends(PartiesList, _super);
    function PartiesList() {
        var _this = this;
        _super.call(this);
        this.subscribe('parties', function () {
            _this.parties = parties_ts_1.Parties.find();
        }, true);
    }
    PartiesList.prototype.removeParty = function (party) {
        parties_ts_1.Parties.remove(party._id);
    };
    PartiesList.prototype.search = function (value) {
        if (value) {
            this.parties = parties_ts_1.Parties.find({ location: value });
        }
        else {
            this.parties = parties_ts_1.Parties.find();
        }
    };
    PartiesList = __decorate([
        core_1.Component({
            selector: 'parties-list',
            templateUrl: 'client/imports/parties-list/parties-list.html',
            directives: [parties_form_ts_1.PartiesForm, router_deprecated_1.RouterLink, angular2_meteor_accounts_ui_1.LoginButtons]
        }), 
        __metadata('design:paramtypes', [])
    ], PartiesList);
    return PartiesList;
}(angular2_meteor_1.MeteorComponent));
exports.PartiesList = PartiesList;
//# sourceMappingURL=parties-list.js.map