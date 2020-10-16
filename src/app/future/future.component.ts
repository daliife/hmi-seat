import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-future',
  templateUrl: './future.component.html',
  styleUrls: ['./future.component.scss']
})
export class FutureComponent implements OnInit {

  @Output() clickPrevious = new EventEmitter<boolean>();
  @Output() clickNext = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onClickPrevious(): void {
    const queryElement = document.querySelector('#future-animation');
    queryElement.classList.add('animate__fadeOutRight');
    queryElement.addEventListener('animationend', () => {
      queryElement.classList.remove('animate__fadeOutRight');
      queryElement.classList.add('animate__fadeInRight');
      this.clickPrevious.emit(true);
    });
  }

  onClickNext(): void {
    const queryElement = document.querySelector('#future-animation');
    queryElement.classList.add('animate__fadeOutLeft');
    queryElement.addEventListener('animationend', () => {
      queryElement.classList.remove('animate__fadeOutLeft');
      queryElement.classList.add('animate__fadeInLeft');
      this.clickNext.emit(true);
    });
  }

}
