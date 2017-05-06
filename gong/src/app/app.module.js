"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var auto_complete_1 = require("@ngui/auto-complete");
var app_component_1 = require("./app.component");
var search_form_component_1 = require("./search-form.component");
var departures_component_1 = require("./departures.component");
var departure_detail_component_1 = require("./departure-detail.component");
var app_routing_module_1 = require("./app-routing.module");
var departures_service_1 = require("./departures.service");
var tram_service_1 = require("./tram.service");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, auto_complete_1.NguiAutoCompleteModule, app_routing_module_1.AppRoutingModule, http_1.HttpModule],
        declarations: [app_component_1.AppComponent, search_form_component_1.SearchFormComponent, departures_component_1.DeparturesComponent, departure_detail_component_1.DepartureDetailComponent],
        bootstrap: [app_component_1.AppComponent],
        providers: [departures_service_1.DeparturesService, tram_service_1.TramService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map