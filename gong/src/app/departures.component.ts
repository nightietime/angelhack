import 'rxjs/add/operator/switchMap';
import * as Rx from 'rxjs/Rx';

import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Http }       from '@angular/http';

import { DeparturesService } from './departures.service';

@Component({
  selector: 'my-departures',
  templateUrl: './departures.component.html',
  styleUrls: ['./departures.component.css', './tram-styles.css'],
  encapsulation: ViewEncapsulation.None
})
export class DeparturesComponent implements OnInit {
  stopId: string;
  stopName: any;
  stopNo: any;
  data: any;
  groupedDepts: any;
  departures: any;
  directions: any;
  disruptions: any;
  routes: any;
  runs: any;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private departuresService: DeparturesService,
    private http: Http
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.stopId = params['stopid'];
      this.getDeparturesData();
    });
    let body = document.getElementsByTagName('body')[0];
    body.classList.add("white");
  }

   ngOnDestroy() {
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("white");
   }

  updateDeparturesData(data: any): void {
    // console.log(data);
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
  }

  getDeparturesData(): void {
    this.departuresService.getDeparturesData(this.stopId)
      .then(departuresData => this.updateDeparturesData(departuresData));
  }
}
