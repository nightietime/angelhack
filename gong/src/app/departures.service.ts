import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class DeparturesService {
  apiUrl = 'http://104.155.227.151:3000/departures'

  constructor(private http: Http) {}

  getDeparturesUrl(stopId: string): string {
    console.log(this.apiUrl + '?stopid=' +  stopId);
    return this.apiUrl + '?stopid=' +  stopId;
  }

  getDeparturesData(stopId: any): Promise<any> {
    return this.http.get(this.getDeparturesUrl(stopId))
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.error('An error occurred', error);  // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
