import { Component, Input } from '@angular/core';
import { TramService } from './tram.service';
import { Http, Response } from "@angular/http";

@Component({
  selector: 'departure-detail',
  templateUrl:"./departure-detail.component.html",
  styleUrls: ['./departures.component.css', './tram-styles.css']
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

  minsToNow(dateTimeString: string): string {
    var date = new Date(dateTimeString);
    var time = date.getTime() - new Date().getTime();
    var mins = Math.round(time/1000/60);  // milliseconds -> seconds -> minutes

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
    else if (mins%60 == 1) {
      if (Math.round(mins/60) == 1) {
        ret += Math.round(mins/60) + " hour " + mins%60 + " min";
      } else {
        ret += Math.round(mins/60) + " hours " + mins%60 + " min";
      }
    }
    else {
      if (Math.round(mins/60) == 1) {
        ret += Math.round(mins/60) + " hour " + mins%60 + " mins";
      } else {
        ret += Math.round(mins/60) + " hours " + mins%60 + " mins";
      }
    }

    return ret;
  }

  getKeys(obj: any): any {
    if (obj) {
      console.log(Object.keys(obj));
      return Object.keys(obj)
        .map((key)=>{return obj[key]} );
    }
  }
}
