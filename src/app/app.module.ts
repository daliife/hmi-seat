import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarLogoComponent } from './navbar-logo/navbar-logo.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { WelcomeVideoComponent } from './welcome-video/welcome-video.component';
import { KombiComponent } from './kombi/kombi.component';
import { FutureComponent } from './future/future.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChronologyComponent } from './chronology/chronology.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarLogoComponent,
    WelcomeComponent,
    WelcomeVideoComponent,
    KombiComponent,
    FutureComponent,
    ChronologyComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
