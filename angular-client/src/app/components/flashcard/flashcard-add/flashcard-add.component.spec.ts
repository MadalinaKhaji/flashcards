import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FlashcardAddComponent } from './flashcard-add.component';

describe('FlashcardAddComponent', () => {
  let component: FlashcardAddComponent;
  let fixture: ComponentFixture<FlashcardAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
