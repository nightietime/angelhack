import { Component, Input } from '@angular/core';

@Component({
  selector: 'departure-detail',
  template: `

  <div *ngFor="let group of getKeys(groupedDepts)">
    <div *ngFor="let departure of group">
      {{routes[departure.route_id].route_name}}
      {{runs[departure.run_id].destination_name}}
      {{directions[departure.direction_id].direction_name}}
      {{departure.estimated_departure_utc}}
    </div>
  </div>
  `
})
export class DepartureDetailComponent {
  @Input() departures: any;
  @Input() directions: any;
  @Input() disruptions: any;
  @Input() routes: any;
  @Input() runs: any;
  @Input() groupedDepts: any;

  getKeys(obj: any): any {
    if (obj) {
      console.log(Object.keys(obj));
      return Object.keys(obj)
        .map((key)=>{return obj[key]} );
    }  
  }
}
