import { Component, Input } from '@angular/core';

@Component({
  selector: 'departure-detail',
  templateUrl: './departure-detail.component.html'
})
export class DepartureDetailComponent {
  @Input() departures: any;
  @Input() directions: any;
  @Input() disruptions: any;
  @Input() routes: any;
  @Input() runs: any;
  @Input() groupedDepts: any;

  // Data needed for post
  data: any = {};
  // Method used for crowdedness post
  onInputData(stop_id: any, run_id: any, crowdedness: any, dirtyLevel, speedingLevel) {
    this.data.stop_id = stop_id;
    this.data.run_id = run_id;
    this.data.crowdedness = crowdedness;
    this.data.dirtyLevel = dirtyLevel;
    this.data.speedingLevel = speedingLevel;
  }
  onSubmit() {
    this.tramService.storeTrams(this.data).subscribe((response) => console.log(response), (error) => console.log(error));
  }

  getKeys(obj: any): any {
    if (obj) {
      console.log(Object.keys(obj));
      return Object.keys(obj)
        .map((key)=>{return obj[key]} );
    }
  }
}
