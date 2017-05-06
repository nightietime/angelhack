import 'rxjs/add/operator/switchMap';
import * as Rx from 'rxjs/Rx';

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Http }       from '@angular/http';

import { DeparturesService } from './departures.service';

@Component({
  selector: 'my-departures',
  template: `DEPARTURES`
})
export class DeparturesComponent implements OnInit {
  stopId: string;
  data: any;

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
  }

  updateDeparturesData(data: any): void {
    console.log(data);
    this.data = data;
  }

  getDeparturesData(): void {
    this.departuresService.getDeparturesData(this.stopId)
      .then(departuresData => this.updateDeparturesData(departuresData));
  }
}
