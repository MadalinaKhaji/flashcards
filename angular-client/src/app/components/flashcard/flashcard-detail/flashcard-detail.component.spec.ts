import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FlashcardDetailComponent } from './flashcard-detail.component';

describe('FlashcardDetailComponent', () => {
  let component: FlashcardDetailComponent;
  let fixture: ComponentFixture<FlashcardDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
