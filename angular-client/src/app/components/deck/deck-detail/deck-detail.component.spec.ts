import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeckDetailComponent } from './deck-detail.component';

describe('DeckDetailComponent', () => {
  let component: DeckDetailComponent;
  let fixture: ComponentFixture<DeckDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeckDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
