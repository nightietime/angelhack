import { Component, Input } from '@angular/core';
import { TramService } from './tram.service';
import { Http, Response } from "@angular/http";

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
  @Input() stopNo: any;

   constructor(private tramService: TramService, private http: Http) {}

  // Data needed for post
  data: any = {};
  // Method used for crowdedness post
  onInputData(crowdedness: any, dirtyLevel: any, speedingLevel: any) {
    this.data.stop_id = this.stopNo;
    this.data.run_id = this.runs;
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
