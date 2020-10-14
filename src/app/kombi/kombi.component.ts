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
  flag = false;
  clickableLinks = false;
  angleNeddle = 0;

  constructor() { }

  ngOnInit(): void {
    this.resetSteps();
  }

  resetSteps(): void {
    this.steps = [true, false, false, false, false, false];
    this.currentImage = 0;
    this.angleNeddle = this.getAngle(-1);
  }

  getPath(index: number): string {
    const res = 1;
    return `assets/kombi/01.png`;
  }

  getAngle(index: number): number {
    let resultAngle = 0;
    switch (index){
      case -1:
        resultAngle = -30;
        break;
      case 0:
        resultAngle = 0;
        break;
      case 1:
        resultAngle = 40;
        break;
      case 2:
        resultAngle = 70;
        break;
      case 3:
        resultAngle = 105;
        break;
      case 4:
        resultAngle = 145;
        break;
      case 5:
        resultAngle = 180;
        break;
    }
    return resultAngle;
  }

  nextStep(newIndex: number): void {
    if (this.currentImage !== newIndex && newIndex <= this.steps.length) {
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
      this.angleNeddle = this.getAngle(newIndex - 1);
      if (newIndex < this.steps.length){
        this.currentImage = newIndex;
        this.steps[this.currentImage] = true;
      }
      if (newIndex === this.steps.length ) {
        this.clickableLinks = true;
      }
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
