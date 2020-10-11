import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-kombi',
  templateUrl: './kombi.component.html',
  styleUrls: ['./kombi.component.scss']
})
export class KombiComponent implements OnInit {

  @Output() clickPrevious = new EventEmitter<boolean>();

  steps: boolean[];
  currentImage = 0;
  flag = true;

  constructor() { }

  ngOnInit(): void {
    this.resetSteps();
  }

  resetSteps(): void {
    this.steps = [true, false, false, false, false, false];
    this.currentImage = 0;
  }

  getPath(index: number): string {
    let result = 'https://via.placeholder.com/1920x1080/';
    switch (index) {
      case 0:
        result += '00FFFF';
        break;
      case 1:
        result += '00FF00';
        break;
      case 2:
        result += '0000FF';
        break;
      case 3:
        result += 'FF00FF';
        break;
      case 4:
        result += 'FFF0FF';
        break;
      case 5:
        result += 'F000FF';
        break;
    }
    return result;
  }

  nextStep(newIndex: number): void {
    if (this.currentImage !== newIndex && newIndex < this.steps.length) {
      const newPath = this.getPath(newIndex);
      const queryElement = document.querySelector('.floating-img');
      if (!this.flag) {
        $('.floating-img').attr('src', newPath);
        queryElement.classList.add('animate__fadeIn');
        this.flag = true;
      } else {
        queryElement.classList.remove('animate__fadeIn');
        queryElement.classList.add('animate__fadeOut');
        queryElement.addEventListener('animationend', () => {
          $('.floating-img').attr('src', newPath);
          queryElement.classList.remove('animate__fadeOut');
          queryElement.classList.remove('opacity_on');
          queryElement.classList.add('opacity_off');
        });
      }
      this.currentImage = newIndex;
      this.steps[this.currentImage] = true;
    }
  }

  fadeIn(): void {
    if (this.flag) {
      const element = document.querySelector('.floating-img');
      element.classList.remove('opacity_off');
      element.classList.add('opacity_on');
      element.classList.add('animate__fadeIn');
    }
  }

  onClickPrevious(): void {
    const queryElement = document.querySelector('.kombi-container');
    queryElement.classList.remove('animate__fadeIn');
    queryElement.classList.add('animate__fadeOut');
    queryElement.addEventListener('animationend', () => {
      queryElement.classList.remove('animate__fadeOut');
      queryElement.classList.add('animate__fadeIn');
      this.clickPrevious.emit(true);
    });
  }

}
