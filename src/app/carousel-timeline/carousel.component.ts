import { IfStmt } from '@angular/compiler';
import { AfterViewInit } from '@angular/core';
import { Component, OnInit, Input, QueryList, ViewChild, ViewChildren, ElementRef, HostListener } from '@angular/core';
import { ICarouselItem } from './Icarousel-item.metadata';

@Component({
  selector: 'app-carousel-timeline',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselTimelineComponent implements OnInit, AfterViewInit {

  @ViewChild('contentItem') contentItem: ElementRef;
  @ViewChild('stepsEvents') stepsEvents: ElementRef;
  @ViewChild('fillingLine') fillingLine: ElementRef;
  @ViewChildren('containerEvents') containerEvents: QueryList<ElementRef>;
  @ViewChildren('timelineEvents') timelineEvents: QueryList<ElementRef>;


  @Input() height = 500;
  @Input() isFullScreen = false;
  @Input() items: ICarouselItem[] = [];


  public finalHeight: string | number = 0;
  public currentPosition = 0;
    public screenWidth: any;



  constructor() {
    this.finalHeight = this.isFullScreen ? '100vh' : `${this.height}px`;
   }

  private static setTransformValue(element: any, property: any, value: any) {
    element.style['-webkit-transform'] = property + '(' + value + ')';
    element.style['-moz-transform'] = property + '(' + value + ')';
    element.style['-ms-transform'] = property + '(' + value + ')';
    element.style['-o-transform'] = property + '(' + value + ')';
    element.style.transform = property + '(' + value + ')';
  }

  private static itemDiff(second: number, first: number): number {
    return Math.round(second - first);
  }

  ngAfterViewInit(): void {
    this.screenWidth = window.innerWidth;
    // console.log(this.screenWidth);
    // this.initTimeline();

  }

  ngOnInit() {
    this.items.map( ( i, index ) => {
      i.id = index;
      i.marginLeft = 0;
    });

  }

  setCurrentPosition(position: number) {
    this.currentPosition = position;
    this.items.find(i => i.id === 0).marginLeft = -100 * position;
    this.updateTimelinePosition(this.currentPosition);
    this.addStyleToContent(this.currentPosition);
  }

  addStyleToContent(currentPosition: number){
    const containerEventsArray = this.containerEvents.toArray();
    let currentPos = currentPosition;
    let lastPos = currentPosition === 0 ? 1 : currentPosition - 1;

    // containerEventsArray[lastPos].nativeElement.style.filter = ` blur(9px)`;
    // if (containerEventsArray[currentPos].nativeElement.style.filter === ` blur(9px)`){
    //       containerEventsArray[currentPos].nativeElement.style.filter = ` blur(0px)`;
    //       console.log(containerEventsArray[currentPos].nativeElement.style.filter);
    // }else{
    //    containerEventsArray[lastPos].nativeElement.style.filter = ` blur(9px)`;
    //              console.log(containerEventsArray[currentPos].nativeElement.style.filter);

    // }
    // containerEventsArray[lastPos].nativeElement.style.filter = ` hue-rotate(210deg)`;
    // if (containerEventsArray[currentPos].nativeElement.style.filter === ` hue-rotate(210deg)`){
    //       containerEventsArray[currentPos].nativeElement.style.filter = ` hue-rotate(0deg))`;
    // }
    containerEventsArray[lastPos].nativeElement.style.filter = `blur(9px)`;
    if (containerEventsArray[currentPos].nativeElement.style.filter === `blur(9px)`){
          containerEventsArray[currentPos].nativeElement.style.filter = `blur(0px)`;
    }
    // containerEventsArray[lastPos].nativeElement.style.filter = `grayscale(1)`;
    // if (containerEventsArray[currentPos].nativeElement.style.filter === `grayscale(1)`){
    //       containerEventsArray[currentPos].nativeElement.style.filter = `grayscale(0)`;
    // }

 }


  updateTimelinePosition(currentPosition: number) {
    const timelineEventsArray = this.timelineEvents.toArray();
    const widthParent = this.stepsEvents.nativeElement.clientWidth;
    let currentPos = currentPosition;
    let lastPos = currentPosition === 0 ? 1 : currentPosition - 1;

    let widthBetweenEvents: number;

    // if (currentPosition === 1) {
    // tslint:disable-next-line:max-line-length
      widthBetweenEvents = CarouselTimelineComponent.itemDiff(timelineEventsArray[currentPos].nativeElement.offsetLeft, timelineEventsArray[lastPos].nativeElement.offsetLeft);
    // }else{
    //   // tslint:disable-next-line:max-line-length
    //   widthBetweenEvents = CarouselTimelineComponent.itemDiff(timelineEventsArray[currentPos].nativeElement.offsetLeft, timelineEventsArray[lastPos].nativeElement.offsetLeft);
    // }

      let result: number;
      result = ( widthBetweenEvents / widthParent ) * currentPos;
      this.translateTimeline(result);
  }

  translateTimeline(value: number) {
    CarouselTimelineComponent.setTransformValue(this.fillingLine.nativeElement, 'scaleX', value);
  }




  setNext() {
    let finalPercentage = 0;
    let nextPosition = this.currentPosition + 1;
    if (nextPosition <= this.items.length - 1) {
      finalPercentage = -100 * nextPosition;
    } else {
      nextPosition = 0;
    }
    this.items.find(i => i.id === 0).marginLeft = finalPercentage;
    this.currentPosition = nextPosition;
  }

  setBack() {
    let finalPercentage = 0;
    let backPosition = this.currentPosition  - 1;
    if (backPosition >= 0) {
      finalPercentage = -100 * backPosition;
    } else {
      backPosition = this.items.length - 1;
      finalPercentage = -100 * backPosition;
    }
    this.items.find(i => i.id === 0).marginLeft = finalPercentage;
    this.currentPosition = backPosition;

  }

}
