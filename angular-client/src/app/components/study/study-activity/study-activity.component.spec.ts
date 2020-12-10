import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StudyActivityComponent } from './study-activity.component';

describe('StudyActivityComponent', () => {
  let component: StudyActivityComponent;
  let fixture: ComponentFixture<StudyActivityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
