import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/Rx";

@Injectable()
export class TramService {

	constructor(private http: Http) {}

	// Method that will be used to store tram data
	storeTrams(data: any) {
		console.log(data);
		return this.http.post("/nextramdb", data);
	}

}
