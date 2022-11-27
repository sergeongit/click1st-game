import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { NavigationHeaderComponent } from './components/navigation-header/navigation-header.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavigationHeaderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
