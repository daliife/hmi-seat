import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hmi-seat';

  showVideo = false;

  toggleVideo(newValue: boolean): void{
    this.showVideo = newValue;
  }
}
