import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarLogoComponent } from './navbar-logo/navbar-logo.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { WelcomeVideoComponent } from './welcome-video/welcome-video.component';
import { KombiComponent } from './kombi/kombi.component';
import { ChronologyComponent } from './chronology/chronology.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarLogoComponent,
    WelcomeComponent,
    WelcomeVideoComponent,
    KombiComponent,
    ChronologyComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
