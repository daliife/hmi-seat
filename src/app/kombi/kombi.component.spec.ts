import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KombiComponent } from './kombi.component';

describe('KombiComponent', () => {
  let component: KombiComponent;
  let fixture: ComponentFixture<KombiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KombiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KombiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
