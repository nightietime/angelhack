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
  @Input() crowdSourcedDisruptions: any;

  activeButtonName: string;
  collapsed: boolean = false;
  success: boolean = false;

   constructor(private tramService: TramService, private http: Http) {}

  // Data needed for post
  data: any = {};
  // Method used for crowdedness post



  onInputData(crowdedness: any, dirtyLevel: any, speedingLevel: any, run_id: any, stop_id: any) {
    this.data.stop_id = stop_id;
    this.data.run_id = run_id;
    this.data.crowdedness = crowdedness;
    this.data.dirtyLevel = dirtyLevel;
    this.data.speedingLevel = speedingLevel;

    function removeSuccess() {
      this.success = false;
    }

    this.success = true;
    setTimeout(removeSuccess, 3000);
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
    console.log('disruptions', this.disruptions);
    if (obj) {
      console.log(Object.keys(obj));
      return Object.keys(obj)
        .map((key)=>{return obj[key]} );
    }
  }

  calculateWidth(runId: any): string {
    console.log(runId);
    if (this.crowdSourcedDisruptions[runId]) {
      return this.crowdSourcedDisruptions[runId].average/3*100 + '%';
    } else {
      return "0%";
    }
  }

  checkIfEmptyJson(json: any): boolean {
    if (json) {
      if (Object.keys(json).length == 0) return false;  // TODO: check for Date (length = 0)
    }
    return true;
  }

  // closeAllOthers(name: string): void {
  //   if (name == this.activeButtonName) { // close active panel
  //
  //   }
  // }
}
