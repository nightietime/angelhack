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
var core_1 = require("@angular/core");
var tram_service_1 = require("./tram.service");
var http_1 = require("@angular/http");
var DepartureDetailComponent = (function () {
    function DepartureDetailComponent(tramService, http) {
        this.tramService = tramService;
        this.http = http;
        // Data needed for post
        this.data = {};
    }
    // Method used for crowdedness post
    DepartureDetailComponent.prototype.onInputData = function (crowdedness, dirtyLevel, speedingLevel, run_id, stop_id) {
        this.data.stop_id = stop_id;
        this.data.run_id = run_id;
        this.data.crowdedness = crowdedness;
        this.data.dirtyLevel = dirtyLevel;
        this.data.speedingLevel = speedingLevel;
    };
    DepartureDetailComponent.prototype.onSubmit = function () {
        this.tramService.storeTrams(this.data).subscribe(function (response) { return console.log(response); }, function (error) { return console.log(error); });
    };
    DepartureDetailComponent.prototype.minsToNow = function (dateTimeString) {
        var date = new Date(dateTimeString);
        var time = date.getTime() - new Date().getTime();
        var mins = Math.round(time / 1000 / 60); // milliseconds -> seconds -> minutes
        var ret = "in ";
        if (mins <= 0) {
            ret = "Now";
        }
        else if (mins == 1) {
            ret += mins + " min";
        }
        else if (mins < 60) {
            ret += mins + " mins";
        }
        else if (mins % 60 == 1) {
            if (Math.round(mins / 60) == 1) {
                ret += Math.round(mins / 60) + " hour " + mins % 60 + " min";
            }
            else {
                ret += Math.round(mins / 60) + " hours " + mins % 60 + " min";
            }
        }
        else {
            if (Math.round(mins / 60) == 1) {
                ret += Math.round(mins / 60) + " hour " + mins % 60 + " mins";
            }
            else {
                ret += Math.round(mins / 60) + " hours " + mins % 60 + " mins";
            }
        }
        return ret;
    };
    DepartureDetailComponent.prototype.getKeys = function (obj) {
        console.log('disruptions', this.disruptions);
        if (obj) {
            console.log(Object.keys(obj));
            return Object.keys(obj)
                .map(function (key) { return obj[key]; });
        }
    };
    DepartureDetailComponent.prototype.calculateWidth = function (runId) {
        console.log(runId);
        if (this.crowdSourcedDisruptions[runId]) {
            return this.crowdSourcedDisruptions[runId].average / 3 * 100 + '%';
        }
        else {
            return "0%";
        }
    };
    DepartureDetailComponent.prototype.checkIfEmptyJson = function (json) {
        if (json) {
            if (Object.keys(json).length == 0)
                return false; // TODO: check for Date (length = 0)
        }
        return true;
    };
    return DepartureDetailComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DepartureDetailComponent.prototype, "departures", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DepartureDetailComponent.prototype, "directions", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DepartureDetailComponent.prototype, "disruptions", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DepartureDetailComponent.prototype, "routes", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DepartureDetailComponent.prototype, "runs", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DepartureDetailComponent.prototype, "groupedDepts", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DepartureDetailComponent.prototype, "stopNo", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DepartureDetailComponent.prototype, "crowdSourcedDisruptions", void 0);
DepartureDetailComponent = __decorate([
    core_1.Component({
        selector: 'departure-detail',
        templateUrl: "./departure-detail.component.html",
        styleUrls: ['./departures.component.css', './tram-styles.css']
    }),
    __metadata("design:paramtypes", [tram_service_1.TramService, http_1.Http])
], DepartureDetailComponent);
exports.DepartureDetailComponent = DepartureDetailComponent;
//# sourceMappingURL=departure-detail.component.js.map