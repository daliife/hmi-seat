import { AfterViewInit } from '@angular/core';
import {
  Component,
  EventEmitter,
  OnInit,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
  ElementRef,
  Output,
} from '@angular/core';
import { ICarouselItem } from './Icarousel-item.metadata';

@Component({
  selector: 'app-carousel-timeline',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
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
  @Output() clickNext = new EventEmitter<boolean>();

  public finalHeight: string | number = 0;
  public currentPosition = 0;
  public screenWidth: any;

  constructor() {
    this.finalHeight = this.isFullScreen ? '100vh' : `${this.height}px`;
  }

  private static setTransformValue(
    element: any,
    property: any,
    value: any
  ): void {
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
  }

  ngOnInit(): void {
    this.items.map((i, index) => {
      i.id = index;
      i.marginLeft = 0;
    });
  }

  setCurrentPosition(position: number): void {
    this.currentPosition = position;
    this.items.find((i) => i.id === 0).marginLeft = -100 * position;
    if (this.currentPosition >= this.items.length - 1) {
      const queryElement = document.querySelector('.dsc-carousel');
      queryElement.classList.add('animate__fadeOut');
      queryElement.addEventListener('animationend', () => {
        queryElement.classList.remove('animate__fadeOut');
        this.clickNext.emit(true);
      });
    } else {
      this.updateTimelinePosition(this.currentPosition);
      this.addStyleToContent(this.currentPosition);
    }
  }

  addStyleToContent(currentPosition: number): void {
    const containerEventsArray = this.containerEvents.toArray();
    const currentPos = currentPosition;
    const lastPos = currentPosition === 0 ? 1 : currentPosition - 1;

    // }
    // containerEventsArray[lastPos].nativeElement.style.filter = ` hue-rotate(210deg)`;
    // if (containerEventsArray[currentPos].nativeElement.style.filter === ` hue-rotate(210deg)`){
    //       containerEventsArray[currentPos].nativeElement.style.filter = ` hue-rotate(0deg))`;
    // }
    containerEventsArray[lastPos].nativeElement.style.filter = `blur(9px)`;
    if (
      containerEventsArray[currentPos].nativeElement.style.filter ===
      `blur(9px)`
    ) {
      containerEventsArray[currentPos].nativeElement.style.filter = `blur(0px)`;
    }
    // containerEventsArray[lastPos].nativeElement.style.filter = `grayscale(1)`;
    // if (containerEventsArray[currentPos].nativeElement.style.filter === `grayscale(1)`){
    //       containerEventsArray[currentPos].nativeElement.style.filter = `grayscale(0)`;
    // }
  }

  updateTimelinePosition(currentPosition: number): void {
    const timelineEventsArray = this.timelineEvents.toArray();
    const widthParent = this.stepsEvents.nativeElement.clientWidth;
    const currentPos = currentPosition;
    const lastPos = currentPosition === 0 ? 1 : currentPosition - 1;

    let widthBetweenEvents: number;
    widthBetweenEvents = CarouselTimelineComponent.itemDiff(
      timelineEventsArray[currentPos].nativeElement.offsetLeft,
      timelineEventsArray[lastPos].nativeElement.offsetLeft
    );

    let result: number;
    result = (widthBetweenEvents / widthParent) * currentPos;
    this.translateTimeline(result);
  }

  translateTimeline(value: number): void {
    CarouselTimelineComponent.setTransformValue(
      this.fillingLine.nativeElement,
      'scaleX',
      value
    );
  }

  setNext(): void {
    let finalPercentage = 0;
    let nextPosition = this.currentPosition + 1;
    if (nextPosition <= this.items.length - 1) {
      finalPercentage = -100 * nextPosition;
    } else {
      nextPosition = 0;
    }
    this.items.find((i) => i.id === 0).marginLeft = finalPercentage;
    this.currentPosition = nextPosition;
  }

  setBack(): void {
    let finalPercentage = 0;
    let backPosition = this.currentPosition - 1;
    if (backPosition >= 0) {
      finalPercentage = -100 * backPosition;
    } else {
      backPosition = this.items.length - 1;
      finalPercentage = -100 * backPosition;
    }
    this.items.find((i) => i.id === 0).marginLeft = finalPercentage;
    this.currentPosition = backPosition;
  }
}
