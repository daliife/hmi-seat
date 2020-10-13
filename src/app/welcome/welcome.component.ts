import { EventEmitter, Output, Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  @Input() initialAnimation: boolean;
  @Output() clickNext = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    if (this.initialAnimation){
      document.querySelector('#welcome-animation').classList.add('animate__zoomIn');
    }else{
      document.querySelector('#welcome-animation').classList.add('animate__fadeInLeft');
    }
  }

  onClickNext(): void {
    const queryElement = document.querySelector('#welcome-animation');
    queryElement.classList.remove('animate__zoomIn');
    queryElement.classList.add('animate__fadeOutLeft');
    queryElement.addEventListener('animationend', () => {
      queryElement.classList.remove('animate__fadeOutLeft');
      queryElement.classList.add('animate__fadeInLeft');
      this.clickNext.emit(true);
    });
  }

}
