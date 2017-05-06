import { Component, Input } from '@angular/core';

@Component({
  selector: 'departure-detail',
  template: `

  <div *ngFor="let group of getKeys(groupedDepts)">
    <div *ngFor="let departure of group">
    <div class="row">
      <div class="blank col-lg-3 hidden-md-down"></div>
      <div class="right-section col-lg-9 col-xs-12">

        <!-- TRAM REPORT -->
        <div class="wrapper">

          <!-- approaching-train -->
          <div class="container section">

            <div class="current-tram">
              <div class="route-no">
                <span class="route_number_table route_number_96">96</span>
                <strong>St. Kilda Beach</strong>
              </div>

              <div class="upcoming-tram">
                <P>Arriving in:</P>
                <h1>5 min</h1>
              </div>

              <div class="progress">
                <div aria-valuemax="60" aria-valuemin="0" aria-valuenow="40" class="progress-bar progress-bar-overcrowded" role="progressbar" style="width: 90%">
                  Overcrowded
                </div>
              </div>
            </div>

            <div class="next-tram">

              <button class="btn btn-md btn-secondary" data-toggle="collapse"
              data-target="#next-tram">Next Tram</button>
              <button class="btn btn-md btn-secondary" data-toggle="collapse"
              data-target="#report-crowdedness">Report Crowdedness</button>
              <button class="btn btn-md btn-secondary" data-toggle="collapse"
              data-target="#report-condition">Report Condition</button>



              <div id="report-condition" class="collapse">
                <br/>

                <div class="row">
                  <a href="#" data-toggle="tooltip" title="Drunk People"
                  class="btn btn-warning btn-md" role="button"><i class="fa fa-beer" aria-hidden="true" style="font-size:30px;color:white;"></i><br/>DRUNK</a>
                  <a href="#" data-toggle="tooltip" title="Dirty"
                  class="btn btn-warning btn-md" role="button"><i class="fa fa-trash" aria-hidden="true" style="font-size:30px;color:white;"></i><br/>DIRTY</a>
                  <a href="#" data-toggle="tooltip" title="Unruly Driver"
                  class="btn btn-warning btn-md" role="button"><i class="fa fa-fast-forward" aria-hidden="true" style="font-size:30px;color:white;"></i><br/>SPEEDING</a>
                  <a href="#" data-toggle="tooltip" title="Other Information"
                  class="btn btn-warning btn-md" role="button"><i class="fa fa-info-circle" aria-hidden="true" style="font-size:30px;color:white;"></i><br/>OTHERS</a>
                </div>

                <br/>
              </div>

              <div id="next-tram" class="collapse">
                <br/>

                <div class="route-no">
                  <span class="route_number_table route_number_96">96</span>
                  <strong>East Brunswick</strong>
                </div>

                <div class="upcoming-tram">
                  <P>Arriving in:</P>
                  <h1>8 min</h1>
                </div>

                <div class="progress">
                  <div aria-valuemax="60" aria-valuemin="0" aria-valuenow="40" class="progress-bar progress-bar-decent" role="progressbar" style="width: 40%">
                    Decent
                  </div>
                </div>

                <br/>
              </div>

              <div id="report-crowdedness" class="collapse">
                <div class="well">
                  <div class="row">
                    <h5>Please rate the tram crowdedness</h5>
                  </div>

                  <div class="row">
                    <form method="POST" action="/nextram" class="col-xs-10 col-xs-offset-1">
                      <button class="btn btn-default btn-lg clear_5px_top" type="submit" name="crowdedness" value="0">Empty</button>
                      <button name="crowdedness" value="1" class="btn btn-success btn-lg clear_5px_top" type="submit">Decent</button>
                      <button name="crowdedness" value="2" class="btn btn-warning btn-lg clear_5px_top" type="button">Full</button>
                      <button class="btn btn-danger btn-lg clear_5px_top" name="crowdedness" value="2" type="submit">Overcrowded</button>
                    </form>
                  </div>
                  
                </div>
              </div>

          </div>
        </div>

      </div> <!-- close row -->
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
