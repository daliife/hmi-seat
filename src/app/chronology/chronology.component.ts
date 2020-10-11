import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chronology',
  templateUrl: './chronology.component.html',
  styleUrls: ['./chronology.component.scss']
})
export class ChronologyComponent implements OnInit {

  @Input() initialAnimation = false;

  @Output() clickPrevious = new EventEmitter<boolean>();
  @Output() clickNext = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    if (this.initialAnimation) {
      document.querySelector('#chronology-animation')?.classList.add('animate__fadeInRight');
    } else {
      document.querySelector('#chronology-animation')?.classList.add('animate__fadeInLeft');
    }
  }

  onClickPrevious(): void {
    const queryElement = document.querySelector('#chronology-animation');
    queryElement.classList.add('animate__fadeOutRight');
    queryElement.addEventListener('animationend', () => {
      queryElement.classList.remove('animate__fadeOutRight');
      queryElement.classList.add('animate__fadeInRight');
      this.clickPrevious.emit(true);
    });
  }

  onClickNext(): void {
    const queryElement = document.querySelector('#chronology-animation');
    queryElement.classList.add('animate__fadeOutLeft');
    queryElement.addEventListener('animationend', () => {
      queryElement.classList.remove('animate__fadeOutLeft');
      queryElement.classList.add('animate__fadeInLeft');
      this.clickNext.emit(true);
    });
  }

}
