import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';

import { AppComponent }  from './app.component';
import { SearchFormComponent } from './search-form.component';
import { DeparturesComponent } from './departures.component';
import { AppRoutingModule } from './app-routing.module'

@NgModule({
  imports:      [ BrowserModule, FormsModule, NguiAutoCompleteModule, AppRoutingModule ],
  declarations: [ AppComponent, SearchFormComponent, DeparturesComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
