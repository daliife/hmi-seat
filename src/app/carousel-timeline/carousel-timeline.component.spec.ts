import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselTimelineComponent } from './carousel-timeline.component';

describe('CarouselTimelineComponent', () => {
  let component: CarouselTimelineComponent;
  let fixture: ComponentFixture<CarouselTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
