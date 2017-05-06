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
require("rxjs/add/operator/switchMap");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var http_1 = require("@angular/http");
var departures_service_1 = require("./departures.service");
var DeparturesComponent = (function () {
    function DeparturesComponent(route, location, departuresService, http) {
        this.route = route;
        this.location = location;
        this.departuresService = departuresService;
        this.http = http;
    }
    DeparturesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.stopId = params['stopid'];
            _this.getDeparturesData();
        });
    };
    DeparturesComponent.prototype.updateDeparturesData = function (data) {
        console.log(data);
        this.data = data;
        var stopName = data.ptvData.stops[+this.stopId].stop_name;
        /* get the stop name and stop no */
        var re = '\\d+$';
        var matches = stopName.match(re);
        if (matches) {
            var match = matches[0];
            this.stopNo = match;
            this.stopName = stopName.slice(0, stopName.length - match.length - 1);
        }
        else {
            this.stopName = stopName;
        }
        this.groupedDepts = data.groupedDepts;
        this.departures = data.ptvData.departures;
        this.directions = data.ptvData.directions;
        this.disruptions = data.ptvData.disruptions;
        this.routes = data.ptvData.routes;
        this.runs = data.ptvData.runs;
    };
    DeparturesComponent.prototype.getDeparturesData = function () {
        var _this = this;
        this.departuresService.getDeparturesData(this.stopId)
            .then(function (departuresData) { return _this.updateDeparturesData(departuresData); });
    };
    return DeparturesComponent;
}());
DeparturesComponent = __decorate([
    core_1.Component({
        selector: 'my-departures',
        templateUrl: './departures.component.html',
        styleUrls: ['./departures.component.css', './tram-styles.css'],
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        common_1.Location,
        departures_service_1.DeparturesService,
        http_1.Http])
], DeparturesComponent);
exports.DeparturesComponent = DeparturesComponent;
//# sourceMappingURL=departures.component.js.map