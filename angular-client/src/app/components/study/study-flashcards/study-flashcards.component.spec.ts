import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StudyFlashcardsComponent } from './study-flashcards.component';

describe('StudyFlashcardsComponent', () => {
  let component: StudyFlashcardsComponent;
  let fixture: ComponentFixture<StudyFlashcardsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyFlashcardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyFlashcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
