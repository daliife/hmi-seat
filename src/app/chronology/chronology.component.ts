import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { ICarouselItem } from '../carousel-timeline/Icarousel-item.metadata';
import { CAROUSEL_DATA_ITEMS } from '../model/carousel.const';

@Component({
  selector: 'app-chronology',
  templateUrl: './chronology.component.html',
  styleUrls: ['./chronology.component.scss'],
})
export class ChronologyComponent implements OnInit, AfterViewInit {
  @ViewChild('contentItem') contentItem: ElementRef;
  @ViewChild('stepsEvents') stepsEvents: ElementRef;
  @ViewChild('fillingLine') fillingLine: ElementRef;
  @ViewChildren('containerEvents') containerEvents: QueryList<ElementRef>;
  @ViewChildren('timelineEvents') timelineEvents: QueryList<ElementRef>;

  @Input() height = 500;
  @Input() isFullScreen = true;
  @Input() items: ICarouselItem[] = [];
  @Output() clickNext = new EventEmitter<boolean>();

  public finalHeight: string | number = 0;
  public currentPosition = 0;
  public screenWidth: any;

  scrollEnabled = true;

  imagePath = 'assets/chronology/50s.png';

  currentImage = 0;

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

  @HostListener('mousewheel', ['$event'])
  onScroll(event: WheelEvent): void {
    const scrollThreshold = 30;
    if (this.scrollEnabled){
      let nextPos = this.currentPosition;
      if (event.deltaY > scrollThreshold && nextPos < 7) {
        this.scrollEnabled = false;
        nextPos++;
        this.setCurrentPosition(nextPos);
        setTimeout(() => {
          this.scrollEnabled = true;
        }, 1000);
        if (nextPos >= 7) {
          const queryElement = document.querySelector('.dsc-carousel');
          queryElement.classList.add('animate__fadeOut');
          queryElement.addEventListener('animationend', () => {
            queryElement.classList.remove('animate__fadeOut');
            this.clickNext.emit(true);
          });
        }
      }
      if (event.deltaY < -scrollThreshold && nextPos > 0) {
        this.scrollEnabled = false;
        console.log(event);
        nextPos--;
        this.setCurrentPosition(nextPos);
        setTimeout(() => {
          this.scrollEnabled = true;
        }, 1000);
      }
    }
  }

  ngOnInit(): void {
    this.items.map((i, index) => {
      i.id = index;
      i.marginLeft = 0;
    });
  }

  ngAfterViewInit(): void {
    this.screenWidth = window.innerWidth;
  }

  animateWithFade(newPath: string): void {
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
  }

  fadeIn(): void {
    const queryElement = document.querySelector('.floating-img');
    queryElement.classList.remove('opacity_off');
    queryElement.classList.add('opacity_on');
    queryElement.classList.add('animate__fadeIn');
  }

  setCurrentPosition(position: number): void {
    this.currentPosition = position;
    if (this.currentPosition >= this.items.length - 1) {
      const queryElement = document.querySelector('.dsc-carousel');
      queryElement.classList.add('animate__fadeOut');
      queryElement.addEventListener('animationend', () => {
        queryElement.classList.remove('animate__fadeOut');
        this.clickNext.emit(true);
      });
    } else {
      this.animateWithFade(CAROUSEL_DATA_ITEMS[position].image);
    }
    this.updateTimelinePosition(this.currentPosition);
  }

  updateTimelinePosition(currentPosition: number): void {
    const timelineEventsArray = this.timelineEvents.toArray();
    const widthParent = this.stepsEvents.nativeElement.clientWidth;
    const currentPos = currentPosition;
    const lastPos = currentPosition === 0 ? 1 : currentPosition - 1;

    let widthBetweenEvents: number;
    widthBetweenEvents = ChronologyComponent.itemDiff(
      timelineEventsArray[currentPos].nativeElement.offsetLeft,
      timelineEventsArray[lastPos].nativeElement.offsetLeft
    );

    let result: number;
    result = (widthBetweenEvents / widthParent) * currentPos;
    ChronologyComponent.setTransformValue(
      this.fillingLine.nativeElement,
      'scaleX',
      result
    );
  }
}
