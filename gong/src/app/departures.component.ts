import 'rxjs/add/operator/switchMap';
import * as Rx from 'rxjs/Rx';

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'my-departures',
  template: `DEPARTURES`
})
export class DeparturesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let stopId = params['stopid'];
      console.log(stopId);
    });
  }
}
