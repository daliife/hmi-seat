import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-kombi',
  templateUrl: './kombi.component.html',
  styleUrls: ['./kombi.component.scss'],
})
export class KombiComponent implements OnInit {
  @Output() clickPrevious = new EventEmitter<boolean>();

  imagePath = 'assets/kombi/00.png';
  positions = [
    {
      x: -2,
      y: 13,
    },
    {
      x: 6,
      y: 40,
    },
    {
      x: 27,
      y: 58,
    },
    {
      x: 58,
      y: 58,
    },
    {
      x: 80,
      y: 40,
    },
    {
      x: 88,
      y: 13,
    },
  ];

  steps: boolean[];
  highlight: boolean[];
  currentImage = 0;
  flag = false;
  clickableLinks = false;
  angleNeddle = 0;

  constructor() {}

  ngOnInit(): void {
    this.resetSteps();
  }

  resetSteps(): void {
    this.steps = [true, false, false, false, false, false];
    this.highlight = [false, false, false, false, false, false];
    this.currentImage = 0;
    this.angleNeddle = this.getAngle(-1);
  }

  getPath(index: number): string {
    const res = 'assets/kombi/0' + index + '.png';
    return res;
  }

  getAngle(index: number): number {
    if (index === -1) {
      return -30;
    }
    return index * 36;
  }

  onClickAdditional(): void {
    const res = 'assets/kombi/07.png';
    this.currentImage = 7;
    this.animateWithFade(res);
  }

  animateWithFade(newPath: string, newIndex?: number): void {
    const queryElement = document.querySelector('.floating-img');
    queryElement.classList?.remove('animate__fadeIn');
    queryElement.classList?.remove('animate__fadeOut');
    queryElement.classList?.remove('opacity_on');

    queryElement.classList.add('animate__fadeOut');
    queryElement.addEventListener('animationend', () => {
      queryElement.classList.remove('animate__fadeOut');
      queryElement.classList.add('opacity_off');
      this.imagePath = newPath;
    });
    if (newIndex != null) {
      this.angleNeddle = this.getAngle(newIndex - 1);
    }
  }

  fadeIn(): void {
    const queryElement = document.querySelector('.floating-img');
    queryElement.classList.remove('opacity_off');
    queryElement.classList.add('opacity_on');
    queryElement.classList.add('animate__fadeIn');
  }

  nextStep(newIndex: number): void {
    if (this.currentImage !== newIndex && newIndex <= this.steps.length) {
      const newPath = this.getPath(newIndex);
      this.animateWithFade(newPath, newIndex);

      if (newIndex <= this.steps.length) {
        this.highlight[this.currentImage] = true; 
      }
      if (newIndex < this.steps.length) {
        this.currentImage = newIndex;
        this.steps[this.currentImage] = true;
      }
      // Enable action links when reached to slide 6
      if (newIndex === this.steps.length) {
        this.clickableLinks = true;
      }
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