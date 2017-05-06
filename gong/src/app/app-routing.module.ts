import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchFormComponent } from './search-form.component';
import { DeparturesComponent } from './departures.component';

const routes: Routes = [
  { path: '', component: SearchFormComponent },
  { path: 'departures/:stopid', component: DeparturesComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
