import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-welcome-video',
  templateUrl: './welcome-video.component.html',
  styleUrls: ['./welcome-video.component.scss']
})
export class WelcomeVideoComponent implements OnInit {

  @Input() showVideo = false;
  @Output() clickSkip = new EventEmitter<boolean>();

  skip = false;

  constructor() { }

  ngOnInit(): void { }

  onClickSkip(): void {
    this.skip = true;
    this.delay(1000);
  }

  async delay(ms: number): Promise<any> {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => {
      this.clickSkip.emit(false);
      this.skip = false;
    });
  }

}
