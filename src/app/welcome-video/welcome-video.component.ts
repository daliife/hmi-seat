import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-welcome-video',
  templateUrl: './welcome-video.component.html',
  styleUrls: ['./welcome-video.component.scss']
})
export class WelcomeVideoComponent implements OnInit {

  @Input() showVideo = false;
  @Output() clickSkip = new EventEmitter<boolean>();

  skipLabel = 'Skip Intro';

  constructor() { }

  ngOnInit(): void { }

  onVideoEnded(): void{
    this.skipLabel = 'Next';
  }

  onClickSkip(): void {
    const queryElement = document.querySelector('.welcome-video-container');
    queryElement.classList.add('animate__fadeOut');
    queryElement.addEventListener('animationend', () => {
      queryElement.classList.remove('animate__fadeOut');
      this.clickSkip.emit(false);
    });
  }

  async delay(ms: number): Promise<any> {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => {
      this.clickSkip.emit(false);
    });
  }

}
