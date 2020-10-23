import { Component } from '@angular/core';
import { ICarouselItem } from './chronology/carouselItem';
import { CAROUSEL_DATA_ITEMS } from './chronology/chronology.data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
   public carouselData: ICarouselItem[] = CAROUSEL_DATA_ITEMS;

  steps: boolean[] = [true, false, false, false, false];
  currentStep = 0;
  showVideo = false;
  initialised = false;
  initialised1 = false;
  initialised2 = false;

  resetSteps(): void {
    this.steps = [false, false, false, false, false];
  }

  nextStep(): void {
    // Flag for second flow boolean
    if (this.initialised2 && this.currentStep < 2){
      this.initialised2 = false;
    }
    if (this.currentStep < this.steps.length) {
      this.currentStep++;
      this.resetSteps();
      this.steps[this.currentStep] = true;
    } else {
      console.warn('could not go to next step');
    }
    // Flag for first flow boolean
    if (!this.initialised && this.currentStep > 0){
      this.initialised = true;
    }
  }

  previousStep(): void {
    // Flag for first flow boolean
    if (!this.initialised2 && this.currentStep >= 2){
      this.initialised2 = true;
    }
    if (this.currentStep >= 0) {
      this.currentStep--;
      this.resetSteps();
      this.steps[this.currentStep] = true;
    } else {
      console.warn('could not go to previous step');
    }
  }

  toggleVideo(newValue: boolean): void {
    this.showVideo = newValue;
  }

}
