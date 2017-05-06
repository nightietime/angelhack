import { Component, ViewEncapsulation } from '@angular/core';

import { STOPS } from './stops';

@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchFormComponent {
  autocomplete: any[] = STOPS['stops'];
  result: any;

  autocompleteListFormatter = (data: any) => {
    let html = `${data.stop_name}`;
    return html;
  }

  getClosestStop = () => {
    var stops = STOPS['stops']

    /* Hardcoded Coordinate for Dream Factory */
    var lat = -37.808232;
    var long = 144.905246;

    
    var sDist = -1;
    var stop;
    for (let s of stops) {
      var dlat = lat - s['stop_latitude'];
      var dlong = long -  s['stop_longitude'];
      var nd = dlat*dlat + dlong*dlong;
      if (sDist < 0 || nd < sDist) {
        stop = s['stop_name'];
        sDist = nd;
      }
    }
    return stop;
  }

  // onSubmit(): void {
  //   console.log(this.result);
  // }

  // valueFormattter = (data: any) => {
  //   let html = `${data.stop_name}`;
  //   return html;
  // }

}
