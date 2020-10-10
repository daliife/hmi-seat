import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hmi-seat';

  showVideo = false;
  showKombi = false;

  toggleVideo(newValue: boolean): void{
    this.showVideo = newValue;
  }

  toggleKombi(show: boolean): void{
    this.showKombi = show;
  }
}
