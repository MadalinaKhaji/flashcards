import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudySrsComponent } from './study-srs.component';

describe('StudySrsComponent', () => {
  let component: StudySrsComponent;
  let fixture: ComponentFixture<StudySrsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudySrsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudySrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
