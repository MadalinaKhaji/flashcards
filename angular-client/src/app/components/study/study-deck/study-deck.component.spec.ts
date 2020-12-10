import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StudyDeckComponent } from './study-deck.component';

describe('StudyDeckComponent', () => {
  let component: StudyDeckComponent;
  let fixture: ComponentFixture<StudyDeckComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyDeckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
