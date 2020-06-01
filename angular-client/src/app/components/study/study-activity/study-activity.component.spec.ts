import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyActivityComponent } from './study-activity.component';

describe('StudyActivityComponent', () => {
  let component: StudyActivityComponent;
  let fixture: ComponentFixture<StudyActivityComponent>;

  beforeEach(async(() => {
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
