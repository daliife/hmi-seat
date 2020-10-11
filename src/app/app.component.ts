import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  steps: boolean[] = [true, false, false];
  currentStep = 0;
  showVideo = false;

  initialised = false;
  initialised2 = false;

  resetSteps(): void {
    this.steps = [false, false, false];
  }

  nextStep(): void {
    // Flag for first flow boolean
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
