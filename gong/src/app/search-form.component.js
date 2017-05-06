"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var stops_1 = require("./stops");
var SearchFormComponent = (function () {
    function SearchFormComponent() {
        var _this = this;
        this.autocomplete = stops_1.STOPS['stops'];
        this.autocompleteListFormatter = function (data) {
            var html = "" + data.stop_name;
            return html;
        };
        this.getClosestStop = function () {
            var stops = stops_1.STOPS['stops'];
            /* Hardcoded Coordinate for Dream Factory */
            var lat = -37.808232;
            var long = 144.905246;
            var sDist = -1;
            var stop1;
            for (var _i = 0, stops_2 = stops; _i < stops_2.length; _i++) {
                var s = stops_2[_i];
                var dlat = lat - s['stop_latitude'];
                var dlong = long - s['stop_longitude'];
                var nd = dlat * dlat + dlong * dlong;
                if (sDist < 0 || nd < sDist) {
                    stop1 = s;
                    sDist = nd;
                }
            }
            _this.result = stop1;
        };
        // onSubmit(): void {
        //   console.log(this.result);
        // }
        // valueFormattter = (data: any) => {
        //   let html = `${data.stop_name}`;
        //   return html;
        // }
    }
    SearchFormComponent.prototype.ngOnInit = function () {
        this.getClosestStop();
    };
    return SearchFormComponent;
}());
SearchFormComponent = __decorate([
    core_1.Component({
        selector: 'search-form',
        templateUrl: './search-form.component.html',
        styleUrls: ['./search-form.component.css'],
        encapsulation: core_1.ViewEncapsulation.None,
    })
], SearchFormComponent);
exports.SearchFormComponent = SearchFormComponent;
//# sourceMappingURL=search-form.component.js.map