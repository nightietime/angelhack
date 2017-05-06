import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';

import { AppComponent }  from './app.component';
import { SearchFormComponent } from './search-form.component';
import { DeparturesComponent } from './departures.component';
import { DepartureDetailComponent } from './departure-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { DeparturesService } from './departures.service';
import { TramService } from './tram.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule, NguiAutoCompleteModule, AppRoutingModule, HttpModule ],
  declarations: [ AppComponent, SearchFormComponent, DeparturesComponent, DepartureDetailComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ DeparturesService, TramService ]
})
export class AppModule { }
