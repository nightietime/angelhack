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

  // onSubmit(): void {
  //   console.log(this.result);
  // }

  // valueFormattter = (data: any) => {
  //   let html = `${data.stop_name}`;
  //   return html;
  // }

}
